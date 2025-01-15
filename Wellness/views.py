from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import WaterIntake, Sleep, Meditation, WellnessAnalysis, Exercise, Mood
from .serializers import WaterIntakeSerializer, SleepSerializer, MeditationSerializer, WellnessAnalysisSerializer, ExerciseSerializer, MoodSerializer

# ------------------- Water Intake Views -------------------

# POST: Create a new Water Intake record
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_water_intake(request):
    try:
        serializer = WaterIntakeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# GET: Retrieve all Water Intake records for the authenticated user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_water_intake(request):
    try:
        water_intakes = WaterIntake.objects.filter(user=request.user)
        serializer = WaterIntakeSerializer(water_intakes, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# GET, PUT, DELETE: Manage a specific Water Intake record
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def water_intake_detail(request, pk):
    try:
        water_intake = WaterIntake.objects.get(pk=pk, user=request.user)
    except WaterIntake.DoesNotExist:
        return Response({'error': 'Water Intake not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = WaterIntakeSerializer(water_intake)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = WaterIntakeSerializer(water_intake, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        water_intake.delete()
        return Response({'message': 'Water Intake deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

# ------------------- Sleep Views -------------------

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_sleep(request):
    try:
        serializer = SleepSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_sleep(request):
    try:
        sleeps = Sleep.objects.filter(user=request.user)
        serializer = SleepSerializer(sleeps, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def sleep_detail(request, pk):
    try:
        sleep = Sleep.objects.get(pk=pk, user=request.user)
    except Sleep.DoesNotExist:
        return Response({'error': 'Sleep record not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SleepSerializer(sleep)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SleepSerializer(sleep, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        sleep.delete()
        return Response({'message': 'Sleep record deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

# ------------------- Meditation Views -------------------

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_meditation(request):
    try:
        serializer = MeditationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_meditation(request):
    try:
        meditations = Meditation.objects.filter(user=request.user)
        serializer = MeditationSerializer(meditations, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def meditation_detail(request, pk):
    try:
        meditation = Meditation.objects.get(pk=pk, user=request.user)
    except Meditation.DoesNotExist:
        return Response({'error': 'Meditation record not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MeditationSerializer(meditation)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = MeditationSerializer(meditation, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        meditation.delete()
        return Response({'message': 'Meditation record deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

# ------------------- Wellness Analysis Views -------------------

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_wellness_analysis(request):
    try:
        serializer = WellnessAnalysisSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_wellness_analysis(request):
    try:
        analyses = WellnessAnalysis.objects.filter(user=request.user)
        serializer = WellnessAnalysisSerializer(analyses, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def wellness_analysis_detail(request, pk):
    try:
        analysis = WellnessAnalysis.objects.get(pk=pk, user=request.user)
    except WellnessAnalysis.DoesNotExist:
        return Response({'error': 'Wellness Analysis not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = WellnessAnalysisSerializer(analysis)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = WellnessAnalysisSerializer(analysis, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        analysis.delete()
        return Response({'message': 'Wellness Analysis deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

# ------------------- Exercise Views -------------------

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_exercise(request):
    try:
        serializer = ExerciseSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_exercises(request):
    try:
        exercises = Exercise.objects.filter(user=request.user)
        serializer = ExerciseSerializer(exercises, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def exercise_detail(request, pk):
    try:
        exercise = Exercise.objects.get(pk=pk, user=request.user)
    except Exercise.DoesNotExist:
        return Response({'error': 'Exercise record not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ExerciseSerializer(exercise)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ExerciseSerializer(exercise, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        exercise.delete()
        return Response({'message': 'Exercise record deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


# ------------------- Mood Views -------------------

# POST: Create a new Mood record
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_mood(request):
    try:
        serializer = MoodSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# GET: Retrieve all Mood records for the authenticated user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_moods(request):
    try:
        moods = Mood.objects.filter(user=request.user)
        serializer = MoodSerializer(moods, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# GET, PUT, DELETE: Manage a specific Mood record
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def mood_detail(request, pk):
    try:
        mood = Mood.objects.get(pk=pk, user=request.user)
    except Mood.DoesNotExist:
        return Response({'error': 'Mood record not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MoodSerializer(mood)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = MoodSerializer(mood, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        mood.delete()
        return Response({'message': 'Mood record deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
