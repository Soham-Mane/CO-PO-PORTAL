# Generated by Django 5.0.2 on 2024-05-02 19:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('copopapp', '0031_calcdata_po10_calcdata_po11_calcdata_po12_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='calcdata',
            name='pso1',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AddField(
            model_name='calcdata',
            name='pso2',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AddField(
            model_name='calcdata',
            name='pso3',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AddField(
            model_name='calcdata',
            name='pso4',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AddField(
            model_name='calcdata',
            name='pso5',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
    ]
