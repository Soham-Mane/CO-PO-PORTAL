# Generated by Django 4.2.1 on 2023-10-27 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('copopapp', '0008_eco1_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eco1',
            name='assignment',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='eco1',
            name='quiz',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='eco1',
            name='test',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='eco1',
            name='theory',
            field=models.IntegerField(null=True),
        ),
    ]
