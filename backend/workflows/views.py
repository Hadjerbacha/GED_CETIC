from rest_framework import generics
from .models import Workflow, Task
from .serializers import WorkflowSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

class WorkflowListView(generics.ListAPIView):
    queryset = Workflow.objects.all()
    serializer_class = WorkflowSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class TaskCreateView(generics.CreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        workflow_id = self.kwargs.get('workflow_id')
        workflow = get_object_or_404(Workflow, pk=workflow_id)

        assigned_username = self.request.data.get('assignedTo')
        assigned_user = User.objects.filter(username=assigned_username).first()

        serializer.save(workflow=workflow, assigned_to=assigned_user)
