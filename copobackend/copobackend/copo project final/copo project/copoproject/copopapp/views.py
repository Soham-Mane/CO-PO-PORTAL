from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password,check_password
from django.core.exceptions import ObjectDoesNotExist
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
from django.http import HttpResponse
from django.shortcuts import redirect
from django.core.serializers import serialize
from .models import CoData,UploadedFile,Teacher,PoData,Eco1Configuration,calcData, Outcome, copodata, EcoResult
import json
import math
import pandas as pd
import os
from django.conf import settings
import numpy as np
import zipfile
import uuid
import time
import ast
import re
import io
# Create your views here.

# @csrf_exempt
# def signup(request):
#     if request.method == 'POST':
#         first_name = request.POST.get('first_name')
#         last_name = request.POST.get('last_name')
#         email = request.POST.get('email')
#         password = request.POST.get('password')
#         print(first_name)

#         if Teacher.objects.filter(email=email).exists():
#             return JsonResponse({"message": "Sign-up failed, username already exists"})
        
#         new_teacher = Teacher(
#             first_name = first_name,
#             last_name = last_name,
#             email = email,
#             password=make_password(password),

#         )

#         new_teacher.save()
#         return JsonResponse({"success": "Sign-up successful"})
#     else:
#         return JsonResponse({"message": "Invalid request method"})
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        print(first_name)

        if Teacher.objects.filter(email=email).exists():
            return JsonResponse({"message": "Sign-up failed, username already exists"})
        
        new_teacher = Teacher(
            first_name = first_name,
            last_name = last_name,
            email = email,
            password=make_password(password),

        )

        new_teacher.save()


        
        # Associate subjects with the teacher
    
        return JsonResponse({"success": "Sign-up successful"})
    else:
        return JsonResponse({"message": "Invalid request method"})


@csrf_exempt
def login(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        try:
            teacher_obj = Teacher.objects.get(email=email)
        except ObjectDoesNotExist:
            return JsonResponse({"message": "Invalid username"}, status=400)
        
        if check_password(password, teacher_obj.password):
            data = {
                'first_name': teacher_obj.first_name,
                'last_name': teacher_obj.last_name,
                'email': teacher_obj.email,
            }
            return JsonResponse(data, status=200)
        else:
            return JsonResponse({"message": "Invalid password"}, status=400)

    return JsonResponse({"message": "Invalid request method"}, status=405)

@csrf_exempt
def upload(request):
    if request.method == 'POST':
        uploaded_file = request.FILES.get('file')

        if uploaded_file:
            new_uploaded_file = UploadedFile(file=uploaded_file)
            new_uploaded_file.save()
            return JsonResponse({'success': True, 'message': 'File uploaded successfully'})

    return JsonResponse({'success': False, 'message': 'Failed to upload file'})

@csrf_exempt
def save_cos_data(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)  # Parse JSON data from the request
            # Assuming your JSON data structure matches the CoData model fields
            co_data = CoData(
                co1=data['co1'],
                co2=data['co2'],
                co3=data['co3'],
                co4=data['co4'],
                co5=data['co5'],
                co6=data['co6'],
            )
            co_data.save()  # Save the CoData instance to the database

            response_data = {'success': True, 'message': 'COs saved successfully'}
            return JsonResponse(response_data)
        except Exception as e:
            print(e)
            return JsonResponse({'success': False, 'message': 'Failed to save COs'})

    return JsonResponse({'success': False, 'message': 'Invalid request method'})



@csrf_exempt
def check(request):
    if request.method == 'POST' and 'file' in request.FILES:
        
        uploaded_file = request.FILES['file']
        if uploaded_file.name.endswith('.csv'):
            uploaded_file_instance = UploadedFile(file=uploaded_file)
            uploaded_file_instance.save()     
            df = pd.read_csv(uploaded_file_instance.file)  # Using a raw string
            
            df.fillna(0, inplace=True)

            df['Total']=df['Q1(5)']+df['Q2(5)']+df['Q3(5)']+df['Q4(5)']
            df['Total.1']=df['Q1(5).1']+df['Q2(5).1']+df['Q3(5).1']+df['Q4(5).1']
        
            # Get the latest CoData object
            
            # print(co_data)
            latest_entry = CoData.objects.latest('id')
            latest_id = latest_entry.id
            co_data = CoData.objects.get(id=latest_id)
            print(latest_id)
            sums_co1 = []

            for j in range(0, df.shape[0]):
                row_sum = 0
                for i in co_data.co1:
                    row_sum += df.iloc[j][i]
                sums_co1.append(row_sum)

            df['CO1_Sum'] = sums_co1

            sums_co2 = []

            for j in range(0, df.shape[0]):
                row_sum = 0
                for i in co_data.co2:
                    row_sum += df.iloc[j][i]
                sums_co2.append(row_sum)

            df['CO2_Sum'] = sums_co2

            sums_co3 = []

            for j in range(0, df.shape[0]):
                row_sum = 0
                for i in co_data.co3:
                    row_sum += df.iloc[j][i]
                sums_co3.append(row_sum)

            df['CO3_Sum'] = sums_co3

            sums_co4 = []

            for j in range(0, df.shape[0]):
                row_sum = 0
                for i in co_data.co4:
                    row_sum += df.iloc[j][i]
                sums_co4.append(row_sum)

            df['CO4_Sum'] = sums_co4

            sums_co5 = []

            for j in range(0, df.shape[0]):
                row_sum = 0
                for i in co_data.co5:
                    row_sum += df.iloc[j][i]
                sums_co5.append(row_sum)

            df['CO5_Sum'] = sums_co5

            sums_co6 = []

            for j in range(0, df.shape[0]):
                row_sum = 0
                for i in co_data.co6:
                    row_sum += df.iloc[j][i]
                sums_co6.append(row_sum)

            df['CO6_Sum'] = sums_co6
            
            df['Total(20)'] = pd.to_numeric(df['Total'], errors='coerce')
            test_threshold = 14
            passed_test = df[df['Total(20)'] >= test_threshold]
            successful_test_students = passed_test.shape[0]
            total_students = 71
            print("--------------------------------")
            print(successful_test_students)
            percentage_test = (successful_test_students / total_students) * 100
            final_percentage_test1 = math.floor(percentage_test)
            print(f"Rounded Percentage of test: {final_percentage_test1}%")
            calc_data_instance = get_calc_data_instancee()  # Implement this function to retrieve the desired calcData instance
            calc_data_instance.rounded_percentage_test1 = final_percentage_test1
            calc_data_instance.successful_student_ut1 = successful_test_students
            

            df  ['Total(200)'] = pd.to_numeric(df['Total.1'], errors='coerce')
            passed_test2 = df[df['Total(200)'] >= 12]
            successful_test2_students = passed_test2.shape[0]
            total_students = 71
            print("--------------------------------")
            print(successful_test2_students)
            percentage_test2 = (successful_test2_students / total_students) * 100
            final_percentage_test2 = math.floor(percentage_test2)
            print(f"Rounded Percentage of test: {final_percentage_test2}%")
            calc_data_instance.rounded_percentage_test2 = final_percentage_test2
            calc_data_instance.successful_student_ut2 = successful_test2_students
            calc_data_instance.save()

            modified_csv = df.to_csv(index=False)
            csv_filename = generate_unique_filename(prefix='final_unit', extension='csv')

            # Define the content type for the response
            response = HttpResponse(modified_csv, content_type='text/csv')

            # Set the attachment header to force download
            response['Content-Disposition'] = f'attachment; filename="{csv_filename}"'

            return response

    return HttpResponse("Invalid request or file format")

   



# @csrf_exempt
# def assignment(request):
#     if request.method == 'POST' and 'file' in request.FILES:
#         # Receive the uploaded file
#         uploaded_file = request.FILES['file']

#         if uploaded_file.name.endswith('.csv'):
#             # Save the uploaded file to the database (if necessary)
#             uploaded_file_instance = UploadedFile(file=uploaded_file)
#             uploaded_file_instance.save()

#             # Read and process the uploaded file
#             dp = pd.read_csv(uploaded_file_instance.file)
#             dp['A1'] = pd.to_numeric(dp['A1'], errors='coerce')

#             total_student = 71
#             filtered_dp1 = dp[dp['A1'] >= 7]
#             successful_students1 = filtered_dp1.shape[0]

#             filtered_dp2 = dp[dp['A2'] >= 7]
#             successful_students2 = filtered_dp2.shape[0]

#             # Perform your logic on the DataFrame
#             percentage1 = (successful_students1 / total_student) * 100
#             percentage2 = (successful_students2 / total_student) * 100
#             rounded_percentage_assignment1 = math.ceil(percentage1)
#             rounded_percentage_assignment2 = math.ceil(percentage2)
#             print(rounded_percentage_assignment1)

#             calc_data_instance = get_calc_data_instancee()  # Implement this function to retrieve the desired calcData instance
#             calc_data_instance.rounded_percentage_assignment1 = rounded_percentage_assignment1
#             calc_data_instance.rounded_percentage_assignment2 = rounded_percentage_assignment2
#             calc_data_instance.save()

#             percentage2 = (successful_students2 / total_student) * 100
#             rounded_percentage2 = math.ceil(percentage2)

#             # Create a new DataFrame with the results
#             result_df = pd.DataFrame({
#                 'Successful_Students_A1': [successful_students1],
#                 'Successful_Students_A2': [successful_students2],
#             })

#             # Concatenate the result DataFrame to the original DataFrame
#             dp = pd.concat([dp, result_df], axis=1)

#             # Convert the modified DataFrame back to a CSV file
#             modified_csv = dp.to_csv(index=False)

#             # Generate a unique filename for the modified CSV

#             modified_csv_filename = "final_assignment51.csv"

#             # Define the URL for the hosted file
#             hosted_file_url = os.path.join(settings.MEDIA_URL, modified_csv_filename)  # Assumes MEDIA_URL is set in your Django settings

#             # Save the modified CSV to a public directory
#             with open(os.path.join(settings.MEDIA_ROOT, modified_csv_filename), 'w') as modified_file:
#                 modified_file.write(modified_csv)

#             # Create an HTTP response with the URL to the hosted file
#             response_data = {
#                 'message': 'File processed successfully',
#                 'file_url': hosted_file_url,
#                 'rounded_percentage1': rounded_percentage_assignment1
#             }

#             return JsonResponse(response_data)  # Return the JSON response, not just the URL

#     return HttpResponse("Invalid request or file format")

def generate_unique_filename(prefix='', extension=''):
    # Generate a UUID
    unique_id = str(uuid.uuid4())

    # Get the current timestamp
    timestamp = str(int(time.time()))

    # Combine prefix, UUID, timestamp, and extension (if provided) to create a unique filename
    filename = f"{prefix}_{timestamp}_{unique_id}"
    if extension:
        filename += f".{extension}"

    return filename

@csrf_exempt
def assignment(request):
    if request.method == 'POST' and 'file' in request.FILES:
        # Receive the uploaded file
        uploaded_file = request.FILES['file']

        if uploaded_file.name.endswith('.csv'):
            # Read and process the uploaded file
            dp = pd.read_csv(uploaded_file)
            dp['A1'] = pd.to_numeric(dp['A1'], errors='coerce')

            total_student = 71
            filtered_dp1 = dp[dp['A1'] >= 7]
            successful_students1 = filtered_dp1.shape[0]

            filtered_dp2 = dp[dp['A2'] >= 7]
            successful_students2 = filtered_dp2.shape[0]

            # Perform your logic on the DataFrame
            percentage1 = (successful_students1 / total_student) * 100
            percentage2 = (successful_students2 / total_student) * 100
            rounded_percentage_assignment1 = math.ceil(percentage1)
            rounded_percentage_assignment2 = math.ceil(percentage2)
            print(rounded_percentage_assignment1)

            # Create a new DataFrame with the results
            result_df = pd.DataFrame({
                'Successful_Students_A1': [successful_students1],
                'Successful_Students_A2': [successful_students2],
            })

            # Concatenate the result DataFrame to the original DataFrame
            dp = pd.concat([dp, result_df], axis=1)

            # Convert the modified DataFrame back to a CSV file
            modified_csv = dp.to_csv(index=False)

            # Generate a unique filename for the CSV file
            csv_filename = generate_unique_filename(prefix='final_assignment', extension='csv')

            # Define the content type for the response
            response = HttpResponse(modified_csv, content_type='text/csv')

            # Set the attachment header to force download
            response['Content-Disposition'] = f'attachment; filename="{csv_filename}"'

            return response

    return HttpResponse("Invalid request or file format")

@csrf_exempt
def quiz(request):
    if request.method == 'POST' and 'file' in request.FILES:
        uploaded_file = request.FILES['file']

        if uploaded_file.name.endswith('.csv'):
            uploaded_file_instance = UploadedFile(file=uploaded_file)
            uploaded_file_instance.save()

            dq = pd.read_csv(uploaded_file_instance.file)
            dq['Q1'] = pd.to_numeric(dq['Q1'].str.split('/').str[0], errors='coerce')

            # Define passing thresholds
            assignment_threshold = 12  # Out of 20

            passed_assignment = dq[dq['Q1'] >= assignment_threshold]
            successful_assignment_students = passed_assignment.shape[0]
            total_students = 71
            print(successful_assignment_students)
            print("--------------------------------")
            percentage_quiz = (successful_assignment_students / total_students) * 100
            final_percentage_quiz_1 = math.floor(percentage_quiz)
            print(f"Rounded Percentage of quiz1: {final_percentage_quiz_1}%")

            #FOR 2nd Quiz
            dq['Q2'] = pd.to_numeric(dq['Q2'].str.split('/').str[0], errors='coerce')

            # Define passing thresholds
            assignment_threshold = 8  # Out of 20

            passed_assignment_2 = dq[dq['Q2'] >= assignment_threshold]
            successful_assignment_students_2 = passed_assignment_2.shape[0]
            print(successful_assignment_students_2)
            print("--------------------------------")
            percentage_quiz_2 = (successful_assignment_students_2 / total_students) * 100
            final_percentage_quiz_2 = math.floor(percentage_quiz_2)
            print(f"Rounded Percentage of quiz: {final_percentage_quiz_2}%")


            #FOR 3rd Quiz
            dq['Q3'] = pd.to_numeric(dq['Q3'].str.split('/').str[0], errors='coerce')

            # Define passing thresholds
            assignment_threshold = 6  # Out of 20

            passed_assignment_3 = dq[dq['Q3'] >= assignment_threshold]
            successful_assignment_students_3 = passed_assignment_3.shape[0]
            print(successful_assignment_students_3)
            print("--------------------------------")
            percentage_quiz_3 = (successful_assignment_students_3 / total_students) * 100
            final_percentage_quiz_3 = math.ceil(percentage_quiz_3)
            print(f"Rounded Percentage of quiz: {final_percentage_quiz_3}%")
            calc_data_instance = get_calc_data_instancee()  # Implement this function to retrieve the desired calcData instance
            calc_data_instance.rounded_percentage_quiz1 = final_percentage_quiz_1
            calc_data_instance.rounded_percentage_quiz2 = final_percentage_quiz_2
            calc_data_instance.rounded_percentage_quiz3 = final_percentage_quiz_3
            calc_data_instance.save()

            result_df = pd.DataFrame({
                'Successful_Students_Q1': [successful_assignment_students],
                'Successful_Students_Q2': [successful_assignment_students_2],
                'Successful_Student_Q3':[successful_assignment_students_3]
            })

            dq = pd.concat([dq, result_df], axis=1)

            # Convert the modified DataFrame back to a CSV file
            modified_csv = dq.to_csv(index=False)

            # Generate a unique filename for the modified CSV
           # Generate a unique filename for the CSV file
            csv_filename = generate_unique_filename(prefix='final_quiz', extension='csv')

            # Define the content type for the response
            response = HttpResponse(modified_csv, content_type='text/csv')

            # Set the attachment header to force download
            response['Content-Disposition'] = f'attachment; filename="{csv_filename}"'

            return response
    return HttpResponse("Invalid request")         


@csrf_exempt
def endsemexam(request):
    if request.method == 'POST' and 'file' in request.FILES:

        uploaded_file = request.FILES['file']

        if uploaded_file.name.endswith('.csv'):

            uploaded_file_instance = UploadedFile(file=uploaded_file)
            uploaded_file_instance.save()
            dt = pd.read_csv(uploaded_file_instance.file)
            dt['Theory(100)'] = pd.to_numeric(dt['Theory(100)'], errors='coerce')
            filtered_dt = dt[dt['Theory(100)'] >= 70]
            total_student = dt.shape[0]
            sucessful_students = filtered_dt.shape[0]
            dt['Theory(100)'] = dt['Theory(100)'].astype(str).str.strip()
            unsuccessful_students = dt[dt['Theory(100)'] == 'F'].shape[0]
            print(sucessful_students)
            print(unsuccessful_students)
            print("--------------------------------")
            percentage = (sucessful_students / total_student) * 100
            rounded_percentage_endsem = math.ceil(percentage)
            calc_data_instance = calcData.objects.latest('id')
            calc_data_instance.rounded_percentage_endesem = rounded_percentage_endsem
            calc_data_instance.successful_students = sucessful_students
            calc_data_instance.unsuccessful_students = unsuccessful_students
            calc_data_instance.total_students = total_student
            calc_data_instance.save()
    
            print(f"Rounded Percentage of theory: {rounded_percentage_endsem}%")


            result_df = pd.DataFrame({
                'Successful_Students': [sucessful_students],
                'Rounded Percentage of theory': [rounded_percentage_endsem],
            })
            dt = pd.concat([dt, result_df], axis=1)
                 # Convert the modified DataFrame back to a CSV file
            modified_csv = dt.to_csv(index=False)

            # Generate a unique filename for the modified CSV
           # Generate a unique filename for the CSV file
            csv_filename = generate_unique_filename(prefix='final_endsem', extension='csv')

            # Define the content type for the response
            response = HttpResponse(modified_csv, content_type='text/csv')

            # Set the attachment header to force download
            response['Content-Disposition'] = f'attachment; filename="{csv_filename}"'

            return response
    return JsonResponse({"Failed" : "Error occured"})

@csrf_exempt
def save_pos_data(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)  # Parse JSON data from the request
            # Assuming your JSON data structure matches the CoData model fields
            po_data = PoData(
                ecc=data['ecc'],
                po1=data['po1'],
                po2=data['po2'],
                po3=data['po3'],
                po4=data['po4'],
                po5=data['po5'],
                po6=data['po6'],
            )
            po_data.save()  # Save the CoData instance to the database

            response_data = {'success': True, 'message': 'POs saved successfully'}
            return JsonResponse(response_data)
        except Exception as e:
            print(e)
            return JsonResponse({'success': False, 'message': 'Failed to save POs'})

    return JsonResponse({'success': False, 'message': 'Invalid request method'})

@csrf_exempt
def feedback(request):
    if request.method == 'POST' and 'file' in request.FILES:
        uploaded_file = request.FILES['file']
        
        if uploaded_file.name.endswith('.csv'):
            uploaded_file_instance = UploadedFile(file=uploaded_file)
            uploaded_file_instance.save()
            df = pd.read_csv(uploaded_file_instance.file)
            
            def calculate_sum_good_excellent_very_good(column):
                counts = column.value_counts()
                sum_good_excellent_very_good = counts.get('Good', 0) + counts.get('Excellent', 0) + counts.get('Very Good', 0)
                return sum_good_excellent_very_good
            
            sums_dict = {}
            
            for col in df.columns[2:]:  # Assuming that columns C1 to C5 contain the categories
                sum_gev = calculate_sum_good_excellent_very_good(df[col])
                sums_dict[col] = sum_gev
                
                # Modify the DataFrame to include a new column for the sum of 'Good', 'Excellent', and 'Very Good'
        
                df[f"Sum_{col}"] = sum_gev
            
            # Calculate the total sum of 'Good', 'Excellent', and 'Very Good' values across the entire DataFrame
            sum_gev_total = sum(sums_dict.values())
            print(sum_gev_total)
            
            # Check if you have already printed the total sum and print it only once
            if not hasattr(feedback, 'already_printed'):
                print(f"Total Sum of Good, Excellent, and Very Good: {sum_gev_total}")
                feedback.already_printed = True  # Mark that it has been printed
            
            sums_df = pd.DataFrame(list(sums_dict.items()), columns=['Column', 'Sum of Good, Excellent, Very Good'])
            print(sums_df)
            modified_csv = df.to_csv(index=False)
            
            csv_filename = generate_unique_filename(prefix='final_feedback', extension='csv')

            # Define the content type for the response
            response = HttpResponse(modified_csv, content_type='text/csv')

            # Set the attachment header to force download
            response['Content-Disposition'] = f'attachment; filename="{csv_filename}"'

            return response
    return JsonResponse({"Failed": "Error occurred"})

@csrf_exempt
def eco1(request):
    try:
        # Retrieve the latest instance of calcData
        latest_instance = calcData.objects.latest('id')
        lat_inst_ec = EcoResult.objects.latest('id')
    except calcData.DoesNotExist:
        # Handle the case where there is no existing instance
        return JsonResponse({"error": "No calcData instance found"})
    except EcoResult.DoesNotExist:
        # Handle the case where there is no existing instance of EcoResult
        lat_inst_ec = EcoResult()
        # You might want to save this new instance here
        lat_inst_ec.save()

    # Get values dynamically from the latest instance
    rounded_percentage_endsem = latest_instance.rounded_percentage_endesem
    rounded_percentage_assignment1 = latest_instance.rounded_percentage_assignment1
    rounded_percentage_assignment2 = latest_instance.rounded_percentage_assignment2
    final_percentage_quiz_1 = latest_instance.rounded_percentage_quiz1
    final_percentage_quiz_2 = latest_instance.rounded_percentage_quiz2
    final_percentage_quiz_3 = latest_instance.rounded_percentage_quiz3
    final_percentage_test1 = latest_instance.rounded_percentage_test1
    final_percentage_test2 = latest_instance.rounded_percentage_test2
    feedback = 98  # Assuming feedback is a constant value
    # Declare the input arrays

    result = np.array([rounded_percentage_endsem, rounded_percentage_assignment1, final_percentage_quiz_1, final_percentage_test1, feedback])
    result = np.nan_to_num(result, nan=0)
    weightage = np.array([0.5, 0.2, 0.2, 0.1, 1])

    coresult = []
    for value in result:
        if value < 56:
            coresult.append(1)
        elif 56 <= value <= 60:
            coresult.append(2)
        else:
            coresult.append(3)

    successful_students = weightage * coresult

    EC01 = 0.8 * successful_students[:4].sum() + 0.2 * successful_students[-1]

    # Print the result
    print(EC01)

    feedback = 72
    result1 = np.array([rounded_percentage_endsem
                        ,final_percentage_test2,rounded_percentage_assignment1,final_percentage_quiz_2,feedback])

    weightage = np.array([0.5, 0.2, 0.2, 0.1, 1])




    coresult1 = []
    for value in result1:
        if value < 56:
            coresult1.append(1)
        elif 56 <= value <= 60:
            coresult1.append(2)
        else:
            coresult1.append(3)
            
    successful_students_2 = weightage * coresult1
            
    EC02 = 0.8 * successful_students_2[:4].sum() + 0.2 * successful_students_2[-1]

# Print the result
    print(EC02)

    feedback = 92
    result2 = np.array([rounded_percentage_endsem,final_percentage_test2,rounded_percentage_assignment2,feedback])

    weightage2 = np.array([0.5, 0.25, 0.25, 1])


    print(result2)
    print(weightage2)

    coresult2 = []
    for value in result2:
        if value < 56:
            coresult2.append(1)
        elif 56 <= value <= 60:
            coresult2.append(2)
        else:
            coresult2.append(3)
        
    print(coresult2)
    successful_students_3 = weightage2 * coresult2
    print(successful_students_3)
    EC03 = 0.8 * successful_students_3[:3].sum() + 0.2 * successful_students_3[-1]

    # Print the result
    print(EC03)

    feedback = 72
    result1 = np.array([rounded_percentage_endsem,final_percentage_test2,rounded_percentage_assignment2,final_percentage_quiz_3,feedback])

    weightage = np.array([0.5, 0.2, 0.2, 0.1, 1])




    coresult1 = []
    for value in result1:
        if value < 56:
            coresult1.append(1)
        elif 56 <= value <= 60:
            coresult1.append(2)
        else:
            coresult1.append(3)
            
    successful_students_2 = weightage * coresult1
            
    EC04 = 0.8 * successful_students_2[:4].sum() + 0.2 * successful_students_2[-1]

# Print the result
    print(EC04)

    feedback = 98
# Declare the input arrays

    result = np.array([rounded_percentage_endsem,rounded_percentage_assignment1,final_percentage_quiz_1,final_percentage_test1,feedback])
    weightage = np.array([0.5, 0.2, 0.2, 0.1, 1])




    coresult = []
    for value in result:
        if value < 56:
            coresult.append(1)
        elif 56 <= value <= 60:
            coresult.append(2)
        else:
            coresult.append(3)
            
    successful_students = weightage * coresult
            
    EC05 = 0.8 * successful_students[:4].sum() + 0.2 * successful_students[-1]

# Print the result
    print(EC05)

    lat_inst_ec.ec01 = EC01
    lat_inst_ec.ec02 = EC02
    lat_inst_ec.ec03 = EC03
    lat_inst_ec.ec04 = EC04
    lat_inst_ec.ec05 = EC05

    lat_inst_ec.save()

    data = json.loads(request.body)

    # Convert the list of lists to a JSON string
    data_json = json.dumps(data)

    # Check if an instance already exists
    existing_instance = copodata.objects.first()

    if existing_instance:
        # Update the existing instance with new data
        existing_instance.data = data_json
        existing_instance.save()
    else:
        # Create a new instance and save the data to it
        copodata.objects.create(data=data_json)
    
    copo_data_objects = copodata.objects.all()
    
    # Convert the data into a format suitable for calculations
    co_po_mapping = []

    for obj in copo_data_objects:
        # Parse the JSON string into a Python list
        data_dict = json.loads(obj.data)
        # Convert the data to integers
        co_po_mapping.append([[int(val) for val in sublist] for sublist in data_dict['coPoMapping']])
    
    co_po_mapping_np = np.array(co_po_mapping)

    copodata_object = copodata.objects.first() # Assuming you have an object with primary key 1
    data_str = copodata_object.data
    match = re.search(r"\[\[.*?\]\]", data_str)
    if match:
        co_po_mapping_str = match.group(0)
        
        # Parse the extracted string as JSON
        co_po_mapping1 = json.loads(co_po_mapping_str)

        # Now you have co_po_mapping array in the desired format
        print(co_po_mapping1)
    else:
        print("No coPoMapping array found in the data.")

    # Perform calculations
    eco_results = EcoResult.objects.all().values_list('ec01', 'ec02', 'ec03', 'ec04', 'ec05').first()
    if eco_results:
        co_attainment = list(eco_results)
    else:
        # If EcoResult is empty, use default values or handle the case as needed
        co_attainment = [2.6, 2.6, 2.6, 2.6, 2.6]

    result_matrix = []

    # Multiplying co_po_mapping and co_attainment, then dividing by 3
    for i in range(len(co_po_mapping)):
        result_row = []
        for j in range(len(co_po_mapping[i])): # Initialize the result value for each cell
            for k in range(len(co_po_mapping[i][j])):
                co_value = co_po_mapping[i][j][k]
                result_value = (co_value * co_attainment[j]) / 3
                result_row.append(result_value)

                # Check if the row has reached 12 values
                if len(result_row) == 12:
                    result_matrix.append(result_row)
                    result_row = []  # Reset the row for the next set of values

    # If there are remaining values, append them as a separate row
    if result_row:
        result_matrix.append(result_row)
    
    # Add the summation values as a new row to the result matrix
    column_sum = [sum(col) for col in zip(*result_matrix)]
    result_matrix.append(column_sum)

    # Calculate PO attainment using the provided formula
    co_po_sum = [sum(col) for col in zip(*co_po_mapping1)]
    print(co_po_sum)
    # Calculate PO attainment using the provided formula
    po_attainment = []
    for i, col_sum in enumerate(co_po_sum):
        if col_sum != 0:
            res_col_sum =  sum(result_matrix[row][i] for row in range(len(result_matrix)-1))
            po_attainment.append((res_col_sum / col_sum )* 3)
        else:
            po_attainment.append(0)  

    # Print PO attainment
    po_attainment_dict = {f"PO{i+1}": round(po, 3) for i, po in enumerate(po_attainment)}

    calc_data_instance = calcData.objects.latest('id') # Assuming you have an object with primary key 1

# Assign the calculated PO values to the instance
    calc_data_instance.po1 = po_attainment_dict.get("PO1", 0)
    calc_data_instance.po2 = po_attainment_dict.get("PO2", 0)
    calc_data_instance.po3 = po_attainment_dict.get("PO3", 0)
    calc_data_instance.po4 = po_attainment_dict.get("PO4", 0)
    calc_data_instance.po5 = po_attainment_dict.get("PO5", 0)

    # Save the instance
    calc_data_instance.save()

    # Include other data as needed in response_data
    response_data = {
        'EC01': EC01,
        'ECO2': EC02,
        'ECO3': EC03,
        'EC04': EC04,
        'EC05': EC05,
        'po_attainment': po_attainment_dict
    }

    return JsonResponse({"error": "Invalid JSON format in request body"}, status=200)


def get_calc_data_instancee():
    try:
        # Retrieve the latest calcData instance based on ID
        instance = calcData.objects.latest('id')
        return instance
    except calcData.DoesNotExist:
        # Create a new instance if none exists
        new_instance = calcData.objects.create()
        return new_instance

def get_calc_data_instance(request):
# Assuming you want to get the latest calcData instance
    calc_data_instance = calcData.objects.latest('id')
    lat_inst_ec = EcoResult.objects.latest('id')
    # Now you can use calc_data_instance to get the data you need
    data = {
        'rounded_percentage_endesem': calc_data_instance.rounded_percentage_endesem,
        'rounded_percentage_assignment1':calc_data_instance.rounded_percentage_assignment1,
        'rounded_percentage_assignment2':calc_data_instance.rounded_percentage_assignment2,
        'successful_students': calc_data_instance.successful_students,
        'unsuccessful_students': calc_data_instance.unsuccessful_students,
        'total_students': calc_data_instance.total_students,
        'rounded_percentage_quiz1':calc_data_instance.rounded_percentage_quiz1,
        'rounded_percentage_quiz2':calc_data_instance.rounded_percentage_quiz2,
        'rounded_percentage_quiz3':calc_data_instance.rounded_percentage_quiz3,
        'rounded_percentage_test1':calc_data_instance.rounded_percentage_test1,
        'rounded_percentage_test2':calc_data_instance.rounded_percentage_test2,
        'po1':calc_data_instance.po1,
        'po2':calc_data_instance.po2,
        'po3':calc_data_instance.po3,
        'po4':calc_data_instance.po4,
        'po5':calc_data_instance.po5,
        'po6':calc_data_instance.po6,
        'po7':calc_data_instance.po7,
        'po8':calc_data_instance.po8,
        'po9':calc_data_instance.po9,
        'po10':calc_data_instance.po10,
        'po11':calc_data_instance.po11,
        'po12':calc_data_instance.po12,
        'co1':lat_inst_ec.ec01,
        'co2':lat_inst_ec.ec02,
        'co3':lat_inst_ec.ec03,
        'co4':lat_inst_ec.ec04,
        'co5':lat_inst_ec.ec05,
        'pso1':calc_data_instance.pso1,
        'pso2':calc_data_instance.pso2,
        'pso3':calc_data_instance.pso3,
        'pso4':calc_data_instance.pso4,
        'pso5':calc_data_instance.pso5,
        # Add other fields as needed
    }

    print(data)

    return JsonResponse(data)


@csrf_exempt
def analyze_experiments(request):
    if request.method == 'POST' and 'file' in request.FILES:
        uploaded_file = request.FILES['file']
        
        if uploaded_file.name.endswith('.csv'):
            dt = pd.read_csv(uploaded_file)
            
            input_data = {
                'Exp1': 'Co2',
                'Exp2': 'Co4',
                'Exp3': 'Co1',
                'Exp4': 'Co5',
                'Exp5': 'Co2',
                'Exp6': 'Co4',
                'Exp7': 'Co2',
                'Exp8': 'Co5',
                'Exp9': 'Co1',
            }

            co_data = {'CO1': {'count': 0, 'total': 0},
                       'CO2': {'count': 0, 'total': 0},
                       'CO3': {'count': 0, 'total': 0},
                       'CO4': {'count': 0, 'total': 0},
                       'CO5': {'count': 0, 'total': 0}}

            num_experiments = 9

            for i in range(1, num_experiments + 1):
                column_name = f'Expt {i}'
                dt[column_name] = pd.to_numeric(dt[column_name], errors='coerce')
                filtered_dt = dt[dt[column_name] >= 7]
                exp_count = filtered_dt.shape[0]
                
                exp_name = f'Exp{i}'
                co = input_data.get(exp_name, '').strip().upper()
                
                if co in co_data:
                    co_data[co]['count'] += 1
                    co_data[co]['total'] += exp_count
                else:
                    print("Invalid CO entered.")

            # Display the counts and averages for each CO
            print("\nCounts and averages for each CO:")
            for co, data in co_data.items():
                count = data['count']
                total = data['total']
                average = total / count if count > 0 else 0
                print(f"{co}: Count={count}, Total={total}, Average={average}")

            # Add the outcome data to the DataFrame
            outcome_data = []
            for co, data in co_data.items():
                count = data['count']
                total = data['total']
                average = total / count if count > 0 else 0
                outcome_data.append({'CO': co, 'Count': count, 'Total': total, 'Average': average})
            outcome_df = pd.DataFrame(outcome_data)

            # Save the outcome data to a CSV file
            modified_csv = outcome_df.to_csv(index=False)
            csv_filename = generate_unique_filename(prefix='final_pracs', extension='csv')

            # Define the content type for the response
            response = HttpResponse(modified_csv, content_type='text/csv')
            response['Content-Disposition'] = f'attachment; filename="{csv_filename}"'

            return response
        else:
            return JsonResponse("Invalid file format. Please upload a CSV file.", safe=False)
    else:
        return JsonResponse("Invalid request method or file not provided.", safe=False)



@csrf_exempt
def save_co_po(request):
    if request.method == 'POST':
        # Assuming the data is sent as a JSON object in the request body
        data = json.loads(request.body)

        # Convert the list of lists to a JSON string
        data_json = json.dumps(data)

        # Check if an instance already exists
        existing_instance = copodata.objects.first()

        if existing_instance:
            # Update the existing instance with new data
            existing_instance.data = data_json
            existing_instance.save()
        else:
            # Create a new instance and save the data to it
            copodata.objects.create(data=data_json)
        
        copo_data_objects = copodata.objects.all()
        
        # Convert the data into a format suitable for calculations
        co_po_mapping = []

        for obj in copo_data_objects:
            # Parse the JSON string into a Python list
            data_dict = json.loads(obj.data)
            # Convert the data to integers
            co_po_mapping.append([[int(val) for val in sublist] for sublist in data_dict['coPoMapping']])
        
        co_po_mapping_np = np.array(co_po_mapping)

        copodata_object = copodata.objects.first() # Assuming you have an object with primary key 1
        data_str = copodata_object.data
        match = re.search(r"\[\[.*?\]\]", data_str)
        if match:
            co_po_mapping_str = match.group(0)
            
            # Parse the extracted string as JSON
            co_po_mapping1 = json.loads(co_po_mapping_str)

            # Now you have co_po_mapping array in the desired format
            print(co_po_mapping1)
        else:
            print("No coPoMapping array found in the data.")

        # Perform calculations
        eco_results = EcoResult.objects.all().values_list('ec01', 'ec02', 'ec03', 'ec04', 'ec05').first()
        if eco_results:
            co_attainment = list(eco_results)
        else:
            # If EcoResult is empty, use default values or handle the case as needed
            co_attainment = [2.6, 2.6, 2.6, 2.6, 2.6]

        result_matrix = []

        # Multiplying co_po_mapping and co_attainment, then dividing by 3
        for i in range(len(co_po_mapping)):
            result_row = []
            for j in range(len(co_po_mapping[i])): # Initialize the result value for each cell
                for k in range(len(co_po_mapping[i][j])):
                    co_value = co_po_mapping[i][j][k]
                    result_value = (co_value * co_attainment[j]) / 3
                    result_row.append(result_value)

                    # Check if the row has reached 12 values
                    if len(result_row) == 12:
                        result_matrix.append(result_row)
                        result_row = []  # Reset the row for the next set of values

        # If there are remaining values, append them as a separate row
        if result_row:
            result_matrix.append(result_row)
        
        # Add the summation values as a new row to the result matrix
        column_sum = [sum(col) for col in zip(*result_matrix)]
        result_matrix.append(column_sum)

        # Calculate PO attainment using the provided formula
        co_po_sum = [sum(col) for col in zip(*co_po_mapping1)]
        print(co_po_sum)
        # Calculate PO attainment using the provided formula
        po_attainment = []
        for i, col_sum in enumerate(co_po_sum):
            if col_sum != 0:
                res_col_sum =  sum(result_matrix[row][i] for row in range(len(result_matrix)-1))
                po_attainment.append((res_col_sum / col_sum )* 3)
            else:
                po_attainment.append(0)  

        # Print PO attainment
        po_attainment_dict = {f"PO{i+1}": round(po, 3) for i, po in enumerate(po_attainment)}

        calc_data_instance = calcData.objects.latest('id')

        calc_data_instance.po1 = po_attainment_dict.get("PO1", 0)
        calc_data_instance.po2 = po_attainment_dict.get("PO2", 0)
        calc_data_instance.po3 = po_attainment_dict.get("PO3", 0)
        calc_data_instance.po4 = po_attainment_dict.get("PO4", 0)
        calc_data_instance.po5 = po_attainment_dict.get("PO5", 0)
        calc_data_instance.po6 = po_attainment_dict.get("PO6", 0)
        calc_data_instance.po7 = po_attainment_dict.get("PO7", 0)
        calc_data_instance.po8 = po_attainment_dict.get("PO8", 0)
        calc_data_instance.po9 = po_attainment_dict.get("PO9", 0)
        calc_data_instance.po10 = po_attainment_dict.get("PO10", 0)
        calc_data_instance.po11 = po_attainment_dict.get("PO11", 0)
        calc_data_instance.po12 = po_attainment_dict.get("PO12", 0)

        # Save the instance
        calc_data_instance.save()

        # Prepare the JSON response data
        response_data = {
            'po_attainment': po_attainment_dict
        }

        print("Result Matrix:")
        for row in result_matrix:
            print(row)


        


        return JsonResponse(response_data)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'})

@csrf_exempt
def pso(request):
    if request.method == 'POST':
        copo_data_objects = copodata.objects.all()
        co_pso_mapping = []

        for obj in copo_data_objects:
            # Parse the JSON string into a Python list
            data_dict = json.loads(obj.data)
            # Convert the data to integers
            co_pso_mapping.append([[int(val) for val in sublist] for sublist in data_dict['coPoMapping']])
        
        co_po_mapping_np = np.array(co_pso_mapping)

        copodata_object = copodata.objects.first() # Assuming you have an object with primary key 1
        data_str = copodata_object.data
        match = re.search(r"\[\[.*?\]\]", data_str)
        if match:
            co_po_mapping_str = match.group(0)
            
            # Parse the extracted string as JSON
            co_pso_mapping1 = json.loads(co_po_mapping_str)

            # Now you have co_po_mapping array in the desired format
            print(co_pso_mapping1)
        else:
            print("No coPoMapping array found in the data.")

        eco_results = EcoResult.objects.all().values_list('ec01', 'ec02', 'ec03', 'ec04', 'ec05').first()
        if eco_results:
            co_attainment = list(eco_results)
        else:
            # If EcoResult is empty, use default values or handle the case as needed
            co_attainment = [2.6, 2.6, 2.6, 2.6, 2.6]

        result_matrix = []

        # Multiplying co_po_mapping and co_attainment, then dividing by 3
        for i in range(len(co_pso_mapping)):
            result_row = []
            for j in range(len(co_pso_mapping[i])): # Initialize the result value for each cell
                for k in range(len(co_pso_mapping[i][j])):
                    co_value = co_pso_mapping[i][j][k]
                    result_value = (co_value * co_attainment[j]) / 3
                    result_row.append(result_value)

                    # Check if the row has reached 5 values
                    if len(result_row) == 5:
                        result_matrix.append(result_row)
                        result_row = []  # Reset the row for the next set of values

        # If there are remaining values, append them as a separate row
        if result_row:
            result_matrix.append(result_row)
        
        # Calculate summation of each column in result_matrix
        column_sum = [sum(col) for col in zip(*result_matrix)]
        result_matrix.append(column_sum)
        print(len(column_sum))       

        # Calculate summation of each column in co_pso_mapping1
        co_pso_sum = [sum(col) for col in zip(*co_pso_mapping1)]
        if len(co_pso_sum) > 5:
         co_pso_sum = co_pso_sum[:5]

# If the length of co_pso_sum is less than 5, pad it with zeros to make its length 5
        while len(co_pso_sum) < 5:
            co_pso_sum.append(0)

        print(co_pso_sum)
        print(len(co_pso_sum))


        # Check if the lengths of column_sum and co_pso_sum are the same
        if len(column_sum) != len(co_pso_sum):
            print("Error: Lengths of column_sum and co_pso_sum are different")
            return JsonResponse({'Error': 'Lengths of column_sum and co_pso_sum are different'})

        final_pso_attainment = []

        # Calculate final PSO attainment, checking for zero division
        for i in range(len(co_pso_sum)):
            if co_pso_sum[i] != 0:
                attainment = column_sum[i] / co_pso_sum[i] * 3
            else:
                attainment = 0  # or any other value you prefer when division by zero occurs
            final_pso_attainment.append(attainment)

        print(final_pso_attainment, "final pso attainment")

        calc_data_instance = calcData.objects.latest('id')
        calc_data_instance.pso1 = final_pso_attainment[0]
        calc_data_instance.pso2 = final_pso_attainment[1]
        calc_data_instance.pso3 = final_pso_attainment[2]
        calc_data_instance.pso4 = final_pso_attainment[3]
        calc_data_instance.pso5 = final_pso_attainment[4]

        calc_data_instance.save()

        return JsonResponse({'Success': 'Chal gya', 'FinalPSOAttainment': final_pso_attainment})
    else:
        return JsonResponse({'Fail': 'Fat gya'})
    # Printing the resulting matrix