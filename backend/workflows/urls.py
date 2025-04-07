from django.urls import path
from .views import WorkflowListView, TaskCreateView

urlpatterns = [
    path('workflows/', WorkflowListView.as_view(), name='workflow-list'),
    path('workflows/<int:workflow_id>/tasks/', TaskCreateView.as_view(), name='task-create'),
]
