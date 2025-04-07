import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def alfresco_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            alfresco_url = "http://localhost:8080/alfresco/api/-default-/public/authentication/versions/1/tickets"
            payload = {"userId": username, "password": password}

            response = requests.post(alfresco_url, json=payload)

            if response.status_code == 201:  # Connexion réussie
                return JsonResponse(response.json(), status=201)
            else:
                return JsonResponse({"error": "Identifiants incorrects"}, status=401)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Méthode non autorisée"}, status=400)


