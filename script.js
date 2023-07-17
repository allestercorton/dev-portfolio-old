document.addEventListener('DOMContentLoaded', () => {

    console.log('test');
    
    // header scroll event
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Menu bar toggle button
    const menu = document.querySelector('.menu');
    const hiddenNav = document.querySelector('.hidden-nav');
    const exitButton = hiddenNav.querySelector('.exit-button');
    const newNavLinks = hiddenNav.querySelectorAll('a');
    let isOpen = false;

    menu.addEventListener('click', () => {
        toggleHiddenNav();
    });

    exitButton.addEventListener('click', () => {
        slideOutHiddenNav();
    });

    newNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleHiddenNav();
        });
    });

    function toggleHiddenNav() {
        isOpen = !isOpen;
        if (isOpen) {
            hiddenNav.style.display = 'block';
            hiddenNav.classList.add('slide-in');
        } else {
            slideOutHiddenNav();
        }
    };

    function slideOutHiddenNav() {
        hiddenNav.classList.add('slide-out');
        hiddenNav.addEventListener('animationend', () => {
            hiddenNav.style.display = 'none';
            hiddenNav.classList.remove('slide-out');
        }, { once: true });
        isOpen = false;
    };

    // form input keydown focus event
    const jobTitleInput = document.querySelector('#job-title');
    const jobDescriptionInput = document.querySelector('#job-description');
    const jobSalaryInput = document.querySelector('#job-salary');
    const submitButton = document.querySelector('#submit');

    jobTitleInput.addEventListener('keydown', (e) => {
        jobTitleKeyPress(e);
    });

    jobDescriptionInput.addEventListener('keydown', (e) => {
        jobDescriptionKeyPress(e);
    });

    jobSalaryInput.addEventListener('keydown', (e) => {
        salaryKeyPress(e);
    });

    const jobTitleKeyPress = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            jobDescriptionInput.focus();
        }
    };

    const jobDescriptionKeyPress = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            jobSalaryInput.focus();
        }
    };

    const salaryKeyPress = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            submitButton.focus();
        }
    };

    // download CV
    const downloadCv = document.querySelector('#download-cv');

    downloadCv.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = 'pdf/Allester-CV.pdf'; // path to your CV file
        link.download = 'Allester-Corton-CV.pdf'; // desired file name for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // hire me submit with email js
    (function () {
        emailjs.init('WEBnhtsg3U-L4PVMe'); // emailjs public key
    })();
      
    const hiremeForm = document.querySelector('#hireme-form');
    
    hiremeForm.addEventListener('submit', (e) => {
        e.preventDefault();
      
        const jobTitleInput = document.querySelector('#job-title');
        const jobDescriptionInput = document.querySelector('#job-description');
        const jobSalaryInput = document.querySelector('#job-salary');
      
        let params = {
            title: jobTitleInput.value,
            description: jobDescriptionInput.value,
            salary: jobSalaryInput.value
        };
      
        const serviceID = 'service_tuqmahq'; // emailjs service ID
        const templateID = 'template_8u42fhn'; // emailjs template ID
      
        emailjs
            .send(serviceID, templateID, params)
            .then((res) => {
                jobTitleInput.value = '';
                jobDescriptionInput.value = '';
                jobSalaryInput.value = '';
                console.log(res);
                alert('Hire Message Sent');
            })
            .catch((err) => console.log(err));
    });
});