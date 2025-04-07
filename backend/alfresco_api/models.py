from django.db import models

# Create your models here.
class Workflow(models.Model):
    STATUS_CHOICES = [
        ("nouveau", "Nouveau"),
        ("en attente", "En attente"),
        ("en cours", "En cours"),
        ("approuvé", "Approuvé"),
        ("rejeté", "Rejeté"),
    ]

    name = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="nouveau")

    def __str__(self):
        return self.name