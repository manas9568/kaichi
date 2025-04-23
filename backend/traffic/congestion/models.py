from django.db import models
from django.utils import timezone
from datetime import timedelta


class TrafficPrediction(models.Model):
    """
    Stores ML model predictions for traffic conditions.
    """

    SEVERITY_CHOICES = [
        ("low", "Low (Normal Traffic)"),
        ("medium", "Medium (Congestion)"),
        ("high", "High (Severe Delay)"),
    ]

    # Route Information
    route_id = models.CharField(max_length=50)
    route_name = models.CharField(max_length=255)

    # ML Predictions
    predicted_severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES)
    predicted_duration_min = models.PositiveIntegerField(
        help_text="Predicted ETA (in minutes) including delay"
    )
    usual_duration_min = models.PositiveIntegerField(
        help_text="Base travel time without congestion"
    )
    confidence_score = models.FloatField(
        null=True, blank=True, help_text="Model confidence (0.0–1.0)"
    )

    # Metadata
    predicted_at = models.DateTimeField(auto_now_add=True)
    expiry_at = models.DateTimeField(
        help_text="When this prediction becomes stale", null=True, blank=True
    )
    is_active = models.BooleanField(
        default=True, help_text="False = Outdated prediction"
    )

    class Meta:
        indexes = [
            models.Index(fields=["route_id"]),
            models.Index(fields=["-predicted_at"]),
        ]
        ordering = ["-predicted_at"]

    def __str__(self):
        return f"{self.route_name}: {self.predicted_severity} ({self.delay_minutes()} min delay)"

    def delay_minutes(self):
        """Difference from normal duration."""
        return self.predicted_duration_min - self.usual_duration_min

    def save(self, *args, **kwargs):
        if not self.expiry_at:
            self.expiry_at = timezone.now() + timedelta(minutes=30)
        super().save(*args, **kwargs)
