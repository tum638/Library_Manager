# Generated by Django 4.0.4 on 2022-07-10 15:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_student_current_book'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='current_book',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='student_with_book', to='api.book'),
        ),
    ]
