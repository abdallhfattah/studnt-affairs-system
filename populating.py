"""
this file is responsible for creating fake students and injecting to the database

"""


import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE" , 'djangoProject.settings')

import django
django.setup()

import random
from base.models import Student, Department
from faker import Faker

fakegen = Faker()

departments = ['IS', 'CS', 'IT', 'AI', 'None', 'DS']

def add_department():
    department = Department.objects.get_or_create(name=random.choice(departments))
    return department[0]

# adding random generated student attributes
def populate(N=5):
    for entry in range(N):
        # Create fake data for the student
        fake_id = fakegen.random_number(digits=8)
        fake_name = fakegen.name()
        fake_gpa = round(random.uniform(1.0, 4.0), 2)
        fake_date_of_birth = fakegen.date_of_birth(minimum_age=18, maximum_age=30)
        fake_gender = random.choice(['Male', 'Female'])
        fake_status = random.choice([True, False])
        fake_level = random.choice(['1', '2' , '3', '4'])
        fake_email = fakegen.email()
        fake_mobile_number = fakegen.phone_number()
        
        # Get the department for the entry
        department = add_department()

        # Create the new student entry
        student = Student.objects.get_or_create(
            stud_id=fake_id,
            stud_name=fake_name,
            stud_gpa=fake_gpa,
            dateOfBirth=fake_date_of_birth,
            gender=fake_gender,
            status=fake_status,
            level=fake_level,
            email=fake_email,
            mobileNumber=fake_mobile_number,
            department=department
        )[0]
        print(Student.objects.get_or_create(
            stud_id=fake_id,
            stud_name=fake_name,
            stud_gpa=fake_gpa,
            dateOfBirth=fake_date_of_birth,
            gender=fake_gender,
            status=fake_status,
            level=fake_level,
            email=fake_email,
            mobileNumber=fake_mobile_number,
            department=department
        ))

if __name__ == '__main__':
    print("inserting students")
    populate(20)
    print("succefully added students")
