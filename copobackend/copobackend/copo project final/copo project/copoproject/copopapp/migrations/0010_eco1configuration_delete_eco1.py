# Generated by Django 4.2.1 on 2023-10-27 17:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('copopapp', '0009_alter_eco1_assignment_alter_eco1_quiz_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Eco1Configuration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('theory', models.IntegerField(null=True)),
                ('assignment', models.IntegerField(null=True)),
                ('quiz', models.IntegerField(null=True)),
                ('test', models.IntegerField(null=True)),
            ],
        ),
        migrations.DeleteModel(
            name='eco1',
        ),
    ]