from django.shortcuts import render, redirect
from base.models import Student, Department
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect ,csrf_exempt
from django.http import JsonResponse
from django.shortcuts import get_object_or_404



def home(requst):
    return render(requst, 'home.html')

def index(request):
    return render(request, 'index.html')


def search(request):
    return render(request, 'search.html')


def about(request):
    return render(request, 'about.html')


def show(request):
    return render(request, 'show.html')


def edit(request):
    return render(request, 'edit.html')

def deactivate(request,id):
    student = Student.objects.get(stud_id=id)
    student.status ^= True
    student.save()
    return HttpResponse("Status changed successfully!")

@login_required
@csrf_exempt
def add(request):
    if request.method == 'POST':
        # Retrieve form data
        name = request.POST.get('stud_name')
        stud_gpa = request.POST.get('stud_gpa')
        email = request.POST.get('email')
        stud_id = request.POST.get('stud_id')
        mobile_number = request.POST.get('mobile_number')
        date_of_birth = request.POST.get('date_of_birth')
        stud_gender = request.POST.get('gender')
        status = request.POST.get('status')
        stud_level = request.POST.get('level')
        department_name = request.POST.get('department')

        print(department_name, "hello world")
        # checking whether student is active
        student_status = False
        if status == "act":
            student_status = True

        # Get the Department instance based on the selected department name since its forigen key
        stud_department = Department.objects.get(name=department_name)

        # Create a new instance of the Student model
        new_student = Student(
            stud_id=stud_id,
            email=email,
            mobileNumber=mobile_number,
            stud_name=name,
            stud_gpa=stud_gpa,
            dateOfBirth=date_of_birth,
            gender=stud_gender,
            status=student_status,
            level=stud_level,
            department=stud_department
        )
        new_student.save()

    return render(request, 'add.html')


def getallstudents(request):
    Students = Student.objects.all()
    gender = "Male"
    ischecked = "checked"
    return render(request,'show.html',{'students':Students , 'gender': gender , 'ischecked':ischecked})

def getallstudents2(request):
    Students = Student.objects.all()
    gender = "Male"
    ischecked = "checked"
    return render(request,'search.html',{'students':Students , 'gender': gender , 'ischecked':ischecked})


@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))


@csrf_protect
def user_login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user:
            if user.is_active:
                login(request, user)
                print("Login successful for Username: {}".format(username))
                return HttpResponseRedirect(reverse('base:home'))
            else:
                # Add an error message
                messages.error(request, "Invalid login credentials")
                print("account is not active for Username: {}".format(username))
        else:
            # Add an error message
            messages.error(request, "Invalid login credentials")
            print("Invalid login credentials for Username: {}".format(username))

    return render(request, 'login.html')

def page_not_found(request, exception):
    return render(request, 'ErrorPage.html', status=404)


def select(request,id):
    student = Student.objects.get(stud_id=id)
    if request.method == 'GET':
        return render(request, 'select.html',{'student':student})
    student.department = Department.objects.get(name=request.POST.get("department"))
    student.save()
    return redirect("base:search")



@csrf_exempt
def check_existing(request):
    if request.method == 'POST':
        stud_id = request.POST.get('stud_id')
        mobile_number = request.POST.get('mobile_number')
        email = request.POST.get('email')
        data = {}

        # Check if the ID exists
        if Student.objects.filter(stud_id=stud_id).exists():
            data['id_exists'] = True
        else:
            data['id_exists'] = False

        # Check if the email exists
        if Student.objects.filter(email=email).exists():
            data['email_exists'] = True
        else:
            data['email_exists'] = False

        # Check if phone number exists
        if Student.objects.filter(mobileNumber=mobile_number).exists():
            data['phone_exists'] = True
        else:
            data['phone_exists'] = False
            
        # print(JsonResponse(data))
        return JsonResponse(data)
   






@login_required
def edit(request, pk):

    if request.method == "GET":
         data = Student.objects.get(stud_id=pk)
         date = str(data.dateOfBirth)
         department = str(data.department)
         return render(request, "edit.html", {"data": data, "date": date, "dep": department})

    if request.method == "POST":
        data = Student.objects.get(stud_id = pk)
        data.stud_name = request.POST.get("name")
        data.stud_id = request.POST.get("stud_id")
        data.stud_gpa = request.POST.get("gpa")
        data.level = request.POST.get("level")
        data.dateOfBirth = request.POST.get("date")
        data.gender = request.POST.get("gender")
        data.email = request.POST.get("email")
        data.mobileNumber = request.POST.get("mobile-number")
        data.save()
        return render(request, 'home.html')

@csrf_exempt
def delete(request,pk):
    data = Student.objects.get(stud_id=pk)
    if request.method == 'POST':
        data.delete()
        return render(request, "home.html")
    return render(request, "delete.html")

