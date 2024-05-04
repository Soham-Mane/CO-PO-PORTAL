from django.db import models

# Create your models here.
class UploadedFile(models.Model):
    file = models.FileField(max_length=257, blank=True)

class CoData(models.Model):
    id = models.AutoField(primary_key=True)  # Add an id field
    co1 = models.JSONField(default=list)
    co2 = models.JSONField(default=list)
    co3 = models.JSONField(default=list)
    co4 = models.JSONField(default=list)
    co5 = models.JSONField(default=list)
    co6 = models.JSONField(default=list)
    
    def __str__(self):
        return f"CO Data for ID {self.pk}"
    
    
class Teacher(models.Model):
    first_name = models.CharField(max_length=255 ,null=True)
    last_name = models.CharField(max_length=255, null=True)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=255)


class PoData(models.Model):
    id = models.AutoField(primary_key=True) 
    ecc = models.CharField(max_length=256) # Add an id field
    po1 = models.JSONField(default=list)
    po2 = models.JSONField(default=list)
    po3 = models.JSONField(default=list)
    po4 = models.JSONField(default=list)
    po5 = models.JSONField(default=list)
    po6 = models.JSONField(default=list)

    def __str__(self):
        return f"PO Data for ID {self.pk}"
    
class Eco1Configuration(models.Model):
    theory = models.IntegerField(null=True)
    assignment = models.IntegerField(null=True)
    quiz = models.IntegerField(null=True)
    test = models.IntegerField(null=True)
    
    @classmethod
    def get_instance(cls):
        instance, created = cls.objects.get_or_create(pk=1)
        return instance

    def save(self, *args, **kwargs):
        self.pk = 1
        super(Eco1Configuration, self).save(*args, **kwargs)

class calcData(models.Model):
    rounded_percentage_endesem = models.IntegerField(null=True, blank=True)
    rounded_percentage_assignment1 = models.IntegerField(null=True, blank=True)
    rounded_percentage_assignment2 = models.IntegerField(null=True, blank=True)
    rounded_percentage_quiz1 = models.IntegerField(null=True, blank=True)
    rounded_percentage_quiz2 = models.IntegerField(null=True, blank=True)
    rounded_percentage_quiz3 = models.IntegerField(null=True, blank=True)
    rounded_percentage_test1 = models.IntegerField(null=True, blank=True)
    rounded_percentage_test2 = models.IntegerField(null=True, blank=True)
    successful_students = models.IntegerField(null=True, blank=True)
    unsuccessful_students = models.IntegerField(null=True, blank=True)
    total_students = models.IntegerField(null=True, blank=True)
    po1 = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    po2 = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    po3 = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    po4 = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    po5 = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    po6 = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    po7 = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    po8 = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    po9 = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    po10 = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    po11 = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    po12 = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    pso1 = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    pso2 = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    pso3 = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    pso4 = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)
    pso5 = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2)


class Outcome(models.Model):
    id = models.AutoField(primary_key=True)  # Add an id field
    co1 = models.JSONField(default=list)
    co2 = models.JSONField(default=list)
    co3 = models.JSONField(default=list)
    co4 = models.JSONField(default=list)
    co5 = models.JSONField(default=list)
    
    def __str__(self):
        return f"CO Data for ID {self.pk}"

  
class copodata(models.Model):
    data = models.CharField(max_length=100)  # Adjust max_length as needed

    def __str__(self):
        return self.data


class EcoResult(models.Model):
    # Fields for storing EC01 to EC05
    ec01 = models.FloatField(verbose_name="EC01",null=True)
    ec02 = models.FloatField(verbose_name="EC02",null=True)
    ec03 = models.FloatField(verbose_name="EC03",null=True)
    ec04 = models.FloatField(verbose_name="EC04",null=True)
    ec05 = models.FloatField(verbose_name="EC05",null=True)