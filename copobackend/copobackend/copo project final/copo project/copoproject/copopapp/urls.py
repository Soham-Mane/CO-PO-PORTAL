from django.contrib import admin
from django.urls import path,include
from .views import upload,save_cos_data,check,assignment,quiz,endsemexam,signup,login,save_pos_data,feedback,eco1,get_calc_data_instance,analyze_experiments, save_co_po, pso

urlpatterns = [
    path('upload/', upload, name='upload'),
    path('save_cos/', save_cos_data, name='save_cos_data'),
    path('save_pos/', save_pos_data, name='save_pos_data'),
    path('check/', check, name='check'),
    path('assignment/',assignment, name='assignment'),
    path('quiz/',quiz, name='quiz'),
    path('endsemexam/',endsemexam, name='endsemexam'),
    path('signup/',signup, name='signup'),
    path('login/',login, name='login'),
    path('feedback/',feedback, name='feedback'),
    path('eco1/',eco1, name='eco1'),
    path('data/',get_calc_data_instance, name='get_calc_data_instance'),
    path('analyze_experiments/', analyze_experiments, name='analyze_experiments'),
    path('savecopo/', save_co_po, name='save_co_po'),
    path('pso/', pso, name='pso'),

]