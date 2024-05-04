from django.contrib import admin
from .models import UploadedFile,CoData,Teacher,PoData,Eco1Configuration,calcData, Outcome, copodata, EcoResult

# Register your models here.
admin.site.register(UploadedFile)
admin.site.register(CoData)
admin.site.register(Teacher)
admin.site.register(PoData)
admin.site.register(Eco1Configuration)
admin.site.register(calcData)
admin.site.register(Outcome)
admin.site.register(copodata)
admin.site.register(EcoResult)