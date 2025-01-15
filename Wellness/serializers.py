from rest_framework import serializers
from .models import WaterIntake, Sleep, Meditation, WellnessAnalysis, Exercise, Mood


# Serializer for Water Intake
class WaterIntakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaterIntake
        fields = ['amount', 'timestamp', 'target_goal']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


# Serializer for Sleep
class SleepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sleep
        fields = ['amount', 'quality', 'target_goal']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


# Serializer for Meditation
class MeditationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meditation
        fields = ['amount', 'insights', 'target_goal', 'timestamp']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


# Serializer for Wellness Analysis
class WellnessAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = WellnessAnalysis
        fields = ['analysis', 'recommendations', 'created_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


# Serializer for Exercise
class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['name', 'duration', 'intensity', 'timestamp', 'target_goal']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


# Serializer for Mood
class MoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mood
        fields = ['mood', 'notes', 'timestamp']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
