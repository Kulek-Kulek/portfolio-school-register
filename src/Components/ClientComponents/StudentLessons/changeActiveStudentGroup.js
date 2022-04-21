export const changeActiveStudentGroup = (e) => {
    const activeNavBtn = document.querySelector('.student__group-nav-btn--active');
    const clickedNavBtn = document.getElementById(e.target.id);
    const groupTeacher = [...document.querySelectorAll('.active-group')];
    const clickedTeacher = document.querySelector('.teacher-group-' + e.target.id);
    const clickedGroupDetails = document.querySelectorAll('.group-' + e.target.id);

    const currentActiveGroupDeatails = [...document.querySelectorAll('.active-group-infodetails')];
    currentActiveGroupDeatails.forEach(item => item.classList.remove('student__group-info--active'));
    clickedGroupDetails.forEach(item => item.classList.add('student__group-info--active'));

    groupTeacher.forEach(item => item.classList.remove('student__single-course--active'));
    clickedTeacher && clickedTeacher.classList.add('student__single-course--active');
    activeNavBtn.classList.remove('student__group-nav-btn--active');
    clickedNavBtn.classList.add('student__group-nav-btn--active');
}