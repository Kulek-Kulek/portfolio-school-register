
export const changeActiveStudentInfoType = () => {
    const figures = [...document.querySelectorAll('.student__dashboard-figure')];
    const studentInfoTypes = [...document.querySelectorAll('.student__infotype-type')];
    const icons = [...document.querySelectorAll('.student__dashboard-i')];

    const changeActiveFigureNav = () => {
        const activeFigureNavIndex = figures.findIndex(figure => figure.classList.contains('student__dashboard-figure--active'));
        figures[activeFigureNavIndex].classList.remove('student__dashboard-figure--active');
    }

    const changeStudentInfoType = () => {
        const activeStudentInfoTypeIndex = studentInfoTypes.findIndex(infoType => infoType.classList.contains('student__infotype-type--active'));
        const activeIconIndex = icons.findIndex(icon => icon.classList.contains('student__dashboard-i--active'));

        studentInfoTypes[activeStudentInfoTypeIndex].classList.remove('student__infotype-type--active');
        icons[activeIconIndex].classList.remove('student__dashboard-i--active');

        const nextFigureIndex = figures.findIndex(figure => figure.classList.contains('student__dashboard-figure--active'));
        studentInfoTypes[nextFigureIndex].classList.add('student__infotype-type--active');
        icons[nextFigureIndex].classList.add('student__dashboard-i--active');
    }

    const clicked = function () {
        changeActiveFigureNav();
        this.classList.add('student__dashboard-figure--active');
        changeStudentInfoType();
    }

    figures.forEach(figure => figure.addEventListener('click', clicked));
}