class API{
    constructor(url){
        this.url = url;
    }
    async getCharacters(){
        let responce = await fetch(`${this.url}/characters`);
        let charactersInfo = await responce.json();
        return charactersInfo;
    }
    async getStudent(){
        let responce = await fetch(`${this.url}/characters/students`)
        let studentsInfo = await responce.json();
        return studentsInfo;
    }
    async getStaff(){
        let responce = await fetch(`${this.url}/characters/staff`)
        let staffInfo = await responce.json();
        return staffInfo;
    }
}

class Info{
    constructor(info){
        this.info = info;
    }

    print(){
        let boxInfo = document.createElement('div');
        boxInfo.classList.add('block-info-person')

        let olInfo = document.createElement('ol');
        olInfo.classList.add('listInfo');

        let { name, actor, house, dateOfBirth, gender, species, patronus, wand, image } = this.info;
        let { wood, core } = wand;

        let imgUrl = restr(image) 

        createLiInfo('Name', name, olInfo);
        createLiInfo('Actor', actor, olInfo);
        if(house){
            createLiInfo('Faculty', house, olInfo);
        }
        if(!dateOfBirth){
            dateOfBirth = 'Unspecified date of birth'
        }
        createLiInfo('Birthday', dateOfBirth, olInfo);
        createLiInfo('Gender', gender, olInfo);
        createLiInfo('Species', species, olInfo);
        if(patronus){
            createLiInfo('Patronus', patronus, olInfo);
        }

        if(wood){
            let liWand = document.createElement('li');
            liWand.classList.add('info-wand')
            liWand.innerHTML = `<span>Wand:</span> <div><span>wood: </span>${wood}<br> <span>core: </span>${core}</div>`;
            olInfo.insertAdjacentElement('beforeend', liWand);
        }
        let boxImg = document.createElement('div');
        boxImg.classList.add('img-box');

        let objLike = JSON.parse(localStorage.getItem(name)) || {like:0, dislike:0};

        let boxLike = document.createElement('div');
        boxLike.classList.add('likes-box');
        let likeBtn = document.createElement('button');
        likeBtn.classList.add('like')
        let likeSpan = document.createElement('span');
        likeSpan.textContent = objLike.like;
        let dislikeBtn = document.createElement('button');
        dislikeBtn.classList.add('dislike')
        let dislikeSpan = document.createElement('span');
        dislikeSpan.textContent = objLike.like;
        let iconDislike = document.createElement('i');
        iconDislike.setAttribute('class', 'fas fa-heart-broken');
        dislikeBtn.insertAdjacentElement('afterbegin', iconDislike);
        let iconLike = document.createElement('i');
        iconLike.setAttribute('class', 'fas fa-heart');
        likeBtn.insertAdjacentElement('afterbegin', iconLike);
        likeBtn.insertAdjacentElement('afterbegin', likeSpan);
        dislikeBtn.insertAdjacentElement('afterbegin', dislikeSpan);

        boxLike.insertAdjacentElement('afterbegin',dislikeBtn);
        boxLike.insertAdjacentElement('afterbegin',likeBtn);

        likeBtn.addEventListener('click', function(){
            let likeInfo = JSON.parse(localStorage.getItem(name)) || {like: 0, dislike: 0};
            likeInfo.like +=1;
            likeSpan.textContent = likeInfo.like;
            localStorage.setItem(name, JSON.stringify(likeInfo))
        })

        dislikeBtn.addEventListener('click', function(){
            let likeInfo = JSON.parse(localStorage.getItem(name)) || {like: 0, dislike: 0};
            likeInfo.dislike +=1;
            dislikeSpan.textContent = likeInfo.dislike;
            localStorage.setItem(name, JSON.stringify(likeInfo))
        })

        let imgPerson = document.createElement('img');
        imgPerson.setAttribute('src', `${imgUrl}`);
        boxImg.insertAdjacentElement('afterbegin',boxLike);
        boxImg.insertAdjacentElement('afterbegin',imgPerson);
        
        boxInfo.insertAdjacentElement('beforeend', boxImg);
        boxInfo.insertAdjacentElement('beforeend', olInfo);
        return boxInfo
    }
}

let api = new API('http://hp-api.herokuapp.com/api');

document.addEventListener('DOMContentLoaded', async () =>{
    let charactersInfo = await api.getCharacters();
    let studentsInfo = await api.getStudent();
    let staffInfo = await api.getStaff();

    // Banner    
    let boxBanner = document.createElement('div');
    boxBanner.classList.add('banner')

    // Menu
    let categories = ['All', 'Student', 'Staff', 'House', 'Gallery'];
    let nav = document.createElement('div');
    nav.classList.add('nav')
    let menu = document.createElement('ul');
    let search = document.createElement('input');
    search.classList.add('search-input')
    search.setAttribute('type','text');
    search.setAttribute('placeholder','Search');

    menu.classList.add('menu');

    for(let i = 0; i<categories.length; i++){
        let menuCategories = document.createElement('li');
        menuCategories.classList.add('menu-categories');
        menuCategories.setAttribute('data-index', i);
        menuCategories.textContent = `${categories[i]}`;
        menu.insertAdjacentElement('beforeend', menuCategories)
    }

    document.body.insertAdjacentElement('afterbegin', boxBanner);
    boxBanner.insertAdjacentElement('beforeend', nav);
    nav.insertAdjacentElement('beforeend', menu);
    nav.insertAdjacentElement('afterbegin', search)
    boxBanner.insertAdjacentElement('beforeend', createSortBox(boxBanner));

    let studentMenu = document.createElement('ul');
    studentMenu.classList.add('student-menu')
    let studentGender = ['Male', 'Female'];

    for(let i = 0; i<studentGender.length; i++){
        let genderLi = document.createElement('li');
        genderLi.setAttribute('data-index', `1.${i}`);
        genderLi.textContent = `${studentGender[i]}`;
        studentMenu.insertAdjacentElement('beforeend', genderLi);
    }

    document.querySelector('.banner li:nth-child(2)').insertAdjacentElement('beforeend', studentMenu);

    let houseMenu = document.createElement('ul');
    houseMenu.classList.add('house-menu');
    let houseName = ['Gryffindor','Slytherin','Ravenclaw'];

    for(let i = 0; i<houseName.length; i++){
        let houseLi = document.createElement('li');
        houseLi.setAttribute('data-index', `3.${i}`);
        houseLi.textContent = `${houseName[i]}`;
        houseMenu.insertAdjacentElement('beforeend', houseLi);
    }
    document.querySelector('.banner li:nth-child(4)').insertAdjacentElement('beforeend', houseMenu)

    let gallery = document.querySelector('.banner li:nth-child(5)');
    gallery.setAttribute('data-index', `4`);

    let titleBox = document.createElement('div');
    titleBox.classList.add('title-box');
    titleBox.innerHTML = '<h1><span>Fictional universe of</span><span>Harry Potter</span></h1>';
    nav.insertAdjacentElement('afterend', titleBox)

    setTimeout(function(){
       titleBox.classList.add('title-on')
    }, 1000)

    let title = document.querySelector('h1');
    title.classList.add('title');

    let secondTitle = document.createElement('h2');
    secondTitle.classList.add('second-title');
    title.insertAdjacentElement('afterend', secondTitle);

    let allMenu = document.querySelector('.menu');

    let arrSort = [];

    console.log(charactersInfo);

    allMenu.addEventListener('click', function(event){
        let numberMenu = event.target.getAttribute('data-index');
        document.querySelector('.sort-box').style.display = 'block';
        title.classList.add('title-affect');
        boxBanner.scrollIntoView({behavior: "smooth"})

        boxBanner.classList.add('banner-top')
        boxBanner.style.height = '350px';

        switch(numberMenu){
            case '0': {
                title.textContent = `${categories[0]} characters`;
                secondTitle.textContent = '';
                menuClick(charactersInfo,boxBanner);
                arrSort = charactersInfo;
                break;
            }
            case '1': {
                title.textContent = categories[1];
                secondTitle.textContent = '';
                menuClick(studentsInfo,boxBanner);
                arrSort = studentsInfo;
                break;
            }
            case '1.0':{
                title.textContent = categories[1];
                secondTitle.textContent = 'Male';
                let arr = [];
                for(let i = 0; i < studentsInfo.length; i++){
                    if(studentsInfo[i].gender == 'male'){
                        arr.push(studentsInfo[i]);
                    }
                }
                menuClick(arr, boxBanner);
                arrSort = arr;
                break;
            }
            case '1.1':{
                title.textContent = categories[1];
                secondTitle.textContent =  'Female';
                let arr = [];
                for(let i = 0; i < studentsInfo.length; i++){
                    if(studentsInfo[i].gender == 'female'){
                        arr.push(studentsInfo[i]);
                    }
                }
                menuClick(arr, boxBanner);
                arrSort = arr;
                break;
            }
            case '2': {
                title.textContent = categories[2];
                secondTitle.textContent = '';
                menuClick(staffInfo,boxBanner);
                arrSort = staffInfo;
                break;
            } 
            case '3': {
                title.textContent = categories[3];
                secondTitle.textContent = '';
                menuClick(charactersInfo,boxBanner);
                arrSort = charactersInfo;
                break;
            }
            case '3.0': {
                title.textContent = categories[3];
                secondTitle.textContent = 'Gryffindor';
                let arr = [];
                for(let i = 0; i < charactersInfo.length; i++){
                    if(charactersInfo[i].house == 'Gryffindor'){
                        arr.push(charactersInfo[i]);
                    }
                }
                menuClick(arr, boxBanner);
                arrSort = arr;
                break;
            }
            case '3.1': {
                title.textContent = categories[3];
                secondTitle.textContent = 'Slytherin';
                let arr = [];
                for(let i = 0; i < charactersInfo.length; i++){
                    if(charactersInfo[i].house == 'Slytherin'){
                        arr.push(charactersInfo[i])
                    }
                }
                menuClick(arr, boxBanner);
                arrSort = arr;
                break;
            }
            case '3.2': {
                title.textContent = categories[3];
                secondTitle.textContent = 'Ravenclaw';
                let arr = [];
                for(let i = 0; i < charactersInfo.length; i++){
                    if(charactersInfo[i].house == 'Ravenclaw'){
                        arr.push(charactersInfo[i])
                    }
                }
                menuClick(arr, boxBanner);
                arrSort = arr;
                break;
            }
            case '4': {
                title.textContent = categories[4];
                secondTitle.textContent = '';
                document.querySelector('.sort-box').style.display = 'none';
                if(document.querySelector('.container-persons')){
                    document.body.removeChild(document.querySelector('.container-persons'));
                }
                createGallery(boxBanner);
                break;
            }
        }
        let btnSort = document.querySelectorAll('.sort-box button');

        btnSort[0].addEventListener('click', function(){
            arrSort.sort(function(a, b){
                let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
                if (nameA < nameB){
                    return -1;
                }
                if (nameA > nameB){
                    return 1;
                }
                return 0;
                });
                menuClick(arrSort, boxBanner)
        })
        btnSort[1].addEventListener('click', function(){
            arrSort.sort(function(a, b){
                let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
                if (nameA > nameB){
                    return -1;
                }
                if (nameA < nameB){
                    return 1;
                }
                return 0;
                });
                menuClick(arrSort, boxBanner)
        })
        btnSort[2].addEventListener('click', function(){
            arrSort.sort(function(a, b){
                if(a.dateOfBirth == ''){
                    return 1;
                }
                if (b.dateOfBirth == '') {
                    return -1;
                }
                let sortDateArr = dateSplit(a,b);
                let dateNewA =new Date(sortDateArr[0]), dateNewB=new Date(sortDateArr[1]);
                return dateNewA-dateNewB;
                })
            menuClick(arrSort, boxBanner) 
        })
        btnSort[3].addEventListener('click', function(){
            arrSort.sort(function(a, b){
                if(a.dateOfBirth == ''){
                    return 1;
                }
                if (b.dateOfBirth == '') {
                    return -1;
                }
                let sortDateArr = dateSplit(a,b);
                let dateNewA =new Date(sortDateArr[0]), dateNewB=new Date(sortDateArr[1]);
                return dateNewB-dateNewA;
                })
            menuClick(arrSort, boxBanner) 
        })
    })

    search.addEventListener('input', function(){
        let valueInput = search.value;
        title.textContent = 'Search';
        title.classList.add('title-affect');
        boxBanner.style.height = '350px';
        boxBanner.insertAdjacentElement('beforeend', sortBox)
        let arrSearch = [];
        for(let i = 0; i<charactersInfo.length; i++){
            if(charactersInfo[i].name.toLowerCase().includes(valueInput)){
                arrSearch.push(charactersInfo[i])
            }
        }
        menuClick(arrSearch, boxBanner);
    })

    search.addEventListener('blur', function(){
        search.value= '';
    })

    boxBanner.insertAdjacentElement('afterend', createFooter());
    
})

function createBoxPersons(){
    if(document.querySelector('.container-gallery')){
        document.body.removeChild(document.querySelector('.container-gallery'));
    }
    if(document.querySelector('.container-persons')){
        document.body.removeChild(document.querySelector('.container-persons'));
    }
    let boxPersons = document.createElement('div');
    boxPersons.classList.add('container-persons');
    return boxPersons;
}

function createGallery(boxBanner){
    if(document.querySelector('.container-gallery')){
        document.body.removeChild(document.querySelector('.container-gallery'));
    }
    let imgSrc = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg', 'img/7.jpg', 'img/8.jpg','img/9.jpg', 'img/10.jpg', 'img/11.jpg', 'img/12.jpg']

    let containerGallery = document.createElement('div')
    containerGallery.classList.add('container-gallery');
    
    let bigImgBox = document.createElement('div');
    bigImgBox.classList.add('big-img');

    bigImgBox.innerHTML = `<img src="img/1.jpg" alt=""><i class="fas fa-angle-left"></i>
    <i class="fas fa-angle-right "></i>`

    let minImgBox = document.createElement('div');
    minImgBox.classList.add('min-img');

    for(let i = 0; i<imgSrc.length; i++){
        let img = document.createElement('img');
        img.setAttribute('src', `${imgSrc[i]}`);
        minImgBox.insertAdjacentElement('beforeend', img);
    }

    containerGallery.insertAdjacentElement('beforeend', bigImgBox);
    containerGallery.insertAdjacentElement('beforeend', minImgBox);
    boxBanner.insertAdjacentElement('afterend', containerGallery);

    let min_img = document.querySelectorAll('.min-img img');
    let right_btn = document.querySelector('.big-img i:nth-of-type(2)');
    let left_btn = document.querySelector('.big-img i:nth-of-type(1)');
    let big_img = document.querySelector('.big-img img')
    let min_src =[];

    for(let i=0; i<min_img.length; i++){
    min_src[i] = min_img[i].getAttribute('src');
    }

    let index=0;
    right_btn.addEventListener('click', function(){
    index++;
    if(index==min_src.length){index=0;}
    big_img.setAttribute('src',min_src[index]);
    })
    right_btn.addEventListener('mouseover', function(){
    this.classList.add('btn-hover');
    })
    right_btn.addEventListener('mouseout', function(){
    this.classList.remove('btn-hover');
    })

    left_btn.addEventListener('click', function(){
    index--;
    if(index<0){index=min_src.length-1;}
    big_img.setAttribute('src',min_src[index]);
    })
    left_btn.addEventListener('mouseover', function(){
    this.classList.add('btn-hover');
    })
    left_btn.addEventListener('mouseout', function(){
    this.classList.remove('btn-hover');
    })

    for(let i=0; i<min_img.length; i++){
    min_img[i].addEventListener('mouseover', function(){
        this.classList.add('min-img-hover');
    })
    }
    for(let i=0; i<min_img.length; i++){
    min_img[i].addEventListener('mouseout', function(){
        this.classList.remove('min-img-hover');
    })
    }

    for(let i=0; i<min_src.length; i++){
    min_img[i].addEventListener('click', function(){
        big_img.setAttribute('src',min_src[i]);
        index = i;
    })
    }

}

function menuClick(infoPerson, boxBanner){
    let boxPersons = createBoxPersons();
    for(let i = 0; i < infoPerson.length; i++){
        boxPersons.insertAdjacentElement('beforeend', new Info(infoPerson[i]).print())
    }
    boxBanner.insertAdjacentElement('afterend', boxPersons);
}

function createSortBox(){
    let sortBox = document.createElement('div');
    sortBox.classList.add('sort-box')

    let sortAbc = document.createElement('label');
    sortAbc.classList.add('sort-abc');
    sortAbc.textContent = 'Sort by name:';
    let btnAz = document.createElement('button');
    let btnZa = document.createElement('button');
    btnAz.textContent = 'A-Z';
    btnZa.textContent = 'Z-A';
    sortAbc.insertAdjacentElement('beforeend', btnAz);
    sortAbc.insertAdjacentElement('beforeend', btnZa);

    let sortBirth = document.createElement('label');
    sortBirth.classList.add('sort-birth');
    sortBirth.textContent = 'Sort by birthday:';
    let btnAscending = document.createElement('button');
    let btnDescending = document.createElement('button');
    btnAscending.textContent = 'Ascending';
    btnDescending.textContent = 'Descending';
    sortBirth.insertAdjacentElement('beforeend', btnAscending);
    sortBirth.insertAdjacentElement('beforeend', btnDescending);

    sortBox.insertAdjacentElement('beforeend', sortAbc);
    sortBox.insertAdjacentElement('beforeend', sortBirth);
    return sortBox;
}

function createLiInfo(label, value, tag){
    let li = document.createElement('li');
    li.innerHTML = `<span>${label}:</span> ${value}`;
    tag.insertAdjacentElement('beforeend', li);
}

function createFooter(){
    let footerBox = document.createElement('div');
    footerBox.classList.add('footer')

    let socialNetworks = document.createElement('div');
    socialNetworks.classList.add('social')

    let socialArr = ['https://www.youtube.com/channel/UChPRO1CB_Hvd0TvKRU62iSQ', 'https://www.instagram.com/wizardingworld', 'https://twitter.com/wizardingworld', 'https://www.facebook.com/wizardingworld'];
    let classIcon = ['fab fa-youtube-square', 'fab fa-instagram-square', 'fab fa-twitter-square', 'fab fa-facebook-square']

    let footerSmall = document.createElement('small');
    footerSmall.textContent = '©2020 Fictional universe of Harry Potter. All Rights Reserved.';

    for(let i = 0; i<socialArr.length; i++){
        let link = document.createElement('a');
        link.classList.add('link-social')
        let icon = document.createElement('i');
        link.setAttribute('href', socialArr[i]);
        icon.setAttribute('class', classIcon[i]);

        link.insertAdjacentElement('beforeend', icon);
        socialNetworks.insertAdjacentElement('beforeend', link);
    }
    footerBox.insertAdjacentElement('beforeend', socialNetworks)
    footerBox.insertAdjacentElement('beforeend', footerSmall);
    return footerBox;
}


function dateSplit(a,b){
    let newDateArr1 = a.dateOfBirth.split('-');
    let newDateArr2 = b.dateOfBirth.split('-');
    let dateA = [newDateArr1[1], newDateArr1[0], newDateArr1[2]]
    let dateB = [newDateArr2[1], newDateArr2[0], newDateArr2[2]]

    let sortDateA = dateA.join('-');
    let sortDateB = dateB.join('-');
    let sortDateArr = [sortDateA, sortDateB]
    return sortDateArr;
}

function restr(url){
    let start = [];
    let end = [];
    let n = 0;
    for(let i = 0; i<url.length;i++){
        n = i;
        if(url[i] == ':'){
            break;
        }
        start[i] = url[i];
    }
    for(let i = n; i<url.length;i++){
        end[i] = url[i];
    }    
    return [
        ...start,
        's',
        ...end
    ].join('');
}



