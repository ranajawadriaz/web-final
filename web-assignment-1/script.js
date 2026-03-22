const courses=[
    {name:'Computer Science', duration:'4 years', fee: 85000},
    {name:'Business Administration', duration:'4 years', fee: 75000},
    {name:'Electrical Engineering', duration:'4 years', fee: 90000},
    {name:'Civil Engineering', duration:'4 years', fee: 88000},
    {name:'Accounting', duration:'3 years', fee: 60000},
    {name:'Graphic Design', duration:'2 years', fee: 70000},
    {name:'Mobile Development', duration:'2 years', fee: 70000},
    {name:'Data Science', duration:'4 years', fee: 95000}



];

function loadCoursesTable()
{
    let tableBody=document.getElementById('courseTableBody');
    if(tableBody==null)
    {
        return;
    }

    let html='';

    for(let i=0;i<courses.length;i++)
    {
        html=html+'<tr>';
        html=html+'<td>'+(i+1)+'</td>';
        html=html+'<td>'+courses[i].name+'</td>';
        html=html+'<td>'+courses[i].duration+'</td>';
        html=html+'<td>Rs. '+courses[i].fee+'</td>';
    
        html=html+'</tr>';

    }

    tableBody.innerHTML=html;


}

function fillCoursesDropdown()
{
    let dropDown=document.getElementById('courseSelect');
    if(dropDown==null)
    {
        return;
    }

    for(let i=0;i<courses.length;i++)
    {
        let option=document.createElement('option');
        option.value=i;
        option.text=courses[i].name+' - Rs. '+courses[i].fee;
        dropDown.append(option);
    }
}

function calculateFee()
{
    let courseIndex=document.getElementById('courseSelect').value;
    let semesterCount=document.getElementById('semesterNumbers').value;
    let scholarship=document.getElementById('scholarship').value;

    if(courseIndex=='')
    {
        alert('Please Select a Course!');
        return;
    }

    if(semesterCount=='' || semesterCount<1)
    {
        alert('Please Enter Valid Course Count!');
        return;
    }

    if (scholarship<0||scholarship>100) {
        alert('Please enter valid Scholarship!');
        return;
        
    }

    if(scholarship=='')
    {
        scholarship=0;
    }

    let fee=courses[courseIndex].fee;

    let totalFee=semesterCount*fee;
    let discounted=(totalFee*scholarship)/100;
    let finalFee=totalFee-discounted;

    let resultDiv=document.getElementById('feeResult');
    resultDiv.innerHTML='<div class="alert alert-success">'+
    ' <p><strong>Total Fee: </strong>' + totalFee + '</p>'+
    ' <p><strong>Discount Amount: </strong>' + discounted + '</p>'+
    '<hr>'+
    ' <p><strong>Final Fee: </strong>' + finalFee + '</p>'+
    '  </div>';
    resultDiv.style.display='block';
        

}

function checkEligibility()
{
    let stName=document.getElementById('stName').value;
    let mark1=parseFloat(document.getElementById('stMarks1').value);
    let mark2=parseFloat(document.getElementById('stMarks2').value);
    let mark3=parseFloat(document.getElementById('stMarks3').value);

    if(stName=='')
    {
        alert('Please enter you name!');
        return;
    }

    if(isNaN(mark1)|| isNaN(mark2)|| isNaN(mark3))
    {
        alert('Please Enter all marks!');
        return;

    }

    if (mark1<0||mark1>100||mark2<0||mark2>100||mark3<0||mark3>100) {
        alert('Please Enter valid marks!');
        return;
        
    }

    let totalMarks=mark1+mark2+mark3;
    let percentage=(totalMarks/300)*100;
    percentage=percentage.toFixed(1);

    let status='';
    let alertCheck='';

    if(percentage>=60)
    {
        status='You are Eligible!';
        alertCheck='alert-success'
    }
    else
    {
        status='You are NOT Eligible';
        alertCheck='alert-danger';
    }

    let resultEligible=document.getElementById('eligibilityResult');
    resultEligible.innerHTML='<div class="alert '+alertCheck+'">'+
    '<p>Dear '+stName+',</p>'+
    '<p>Your Total Marks are '+totalMarks+'</p>'+
    '<p>And your Percentage is '+percentage+'</p>'+
    '<hr>'+
    '<p><strong>'+status+'</strong></p>'+
    '</div>';
    resultEligible.style.display='block';


}

let correctAnswer=0;

function loadCaptcha()
{
    let captchaElement=document.getElementById('captchaQuestion');
    if(captchaElement==null)
    {
        return;
    }

    let num1=Math.floor(Math.random()*20)+1;
    let num2=Math.floor(Math.random()*20)+1;
    correctAnswer=num1+num2;

    captchaElement.innerHTML='What is Correct Answer of: '+num1+' + '+num2+' ? ';


}

function contactSubmit()
{
    let name=document.getElementById('cName').value;
    let number=document.getElementById('cNum').value;
    let email=document.getElementById('cEmail').value;
    let txt=document.getElementById('txtarea').value;
    let answer=document.getElementById('captchaAnswer').value;

    document.getElementById('nameError').style.display='none';
    document.getElementById('phoneError').style.display='none';
    document.getElementById('emailError').style.display='none';
    document.getElementById('txtError').style.display='none';
    document.getElementById('captchaError').style.display='none';

    let isError=false;

    if(name=='')
    {
        document.getElementById('nameError').style.display='block';
        isError=true;

    }

    if(number=='')
    {
        document.getElementById('phoneError').style.display='block';
        isError=true;
    }

    if(email==''|| email.indexOf('@')=='-1'||email.indexOf('.')=='-1')
    {
        document.getElementById('emailError').style.display='block';
        isError=true;
    }

    if(txt=='')
    {
        document.getElementById('txtError').style.display='block';
        isError=true;
    }

    if(parseInt(answer)!=correctAnswer)
    {
        document.getElementById('captchaError').style.display='block';
        loadCaptcha();
        document.getElementById('captchaAnswer').value='';
        isError=true;

    }

    if(isError==true)
    {
        return;
    }

    alert('Thank you '+name+'. Please visit again.');

    document.getElementById('cName').value='';
    document.getElementById('cNum').value='';
    document.getElementById('cEmail').value='';
    document.getElementById('txtarea').value='';
    document.getElementById('captchaAnswer').value='';

    loadCaptcha();




}