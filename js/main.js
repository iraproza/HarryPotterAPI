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
        boxInfo.classList.add('block-info')

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
            if(!core){
                core = 'unknown'
            }
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
        likeBtn.setAttribute('title', 'like')
        let likeSpan = document.createElement('span');
        likeSpan.textContent = objLike.like;
        let dislikeBtn = document.createElement('button');
        dislikeBtn.classList.add('dislike')
        dislikeBtn.setAttribute('title', 'dislike')
        let dislikeSpan = document.createElement('span');
        dislikeSpan.textContent = objLike.like;
        let iconDislike = document.createElement('i');
        iconDislike.setAttribute('class', 'fas fa-heart-broken');
        let iconLike = document.createElement('i');
        iconLike.setAttribute('class', 'fas fa-heart');
        likeBtn.insertAdjacentElement('afterbegin', likeSpan);
        dislikeBtn.insertAdjacentElement('afterbegin', dislikeSpan);
        likeBtn.insertAdjacentElement('afterbegin', iconLike);
        dislikeBtn.insertAdjacentElement('afterbegin', iconDislike);
        boxLike.insertAdjacentElement('afterbegin',dislikeBtn);
        boxLike.insertAdjacentElement('afterbegin',likeBtn);

        iconLike.addEventListener('click', function(){
            let likeInfo = JSON.parse(localStorage.getItem(name)) || {like: 0, dislike: 0};
            likeInfo.like +=1;
            likeSpan.textContent = likeInfo.like;
            localStorage.setItem(name, JSON.stringify(likeInfo))
        })

        iconDislike.addEventListener('click', function(){
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
    let categories = ['All', 'Student', 'Staff', 'House', 'Gallery', 'Movies'];
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

    let movies = [
        {
            link: 'https://uakino.club/filmi/genre_adventure/159-garr-potter-flosofskiy-kamn.html',
            movieName:"Harry Potter and the Philosopher's Stone", 
            year:"2001",
            Director:"Chris Columbus", 
            duration:"152 min", 
            description: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world", 
            gross: "$317.58M",
            src: 'img/poster1.jpg'
        },
        {
            link: 'https://uakino.club/filmi/genre_adventure/214-garr-potter-tayemna-kmnata.html',
            movieName:"Harry Potter and the Chamber of Secrets", 
            year:"2002",
            Director:"Chris Columbus", 
            duration:"161 min", 
            description: "An ancient prophecy seems to be coming true when a mysterious presence begins stalking the corridors of a school of magic and leaving its victims paralyzed.", 
            gross: "$261.99M",
            src: 'img/poster2.jpg'
        },
        {
            link: 'https://uakino.club/filmi/genre_adventure/213-garr-potter-vyazen-azkabanu.html',
            movieName:"Harry Potter and the Prisoner of Azkaban", 
            year:"2004",
            Director:"Alfonso Cuarón", 
            duration:"142 min", 
            description: "Harry Potter, Ron and Hermione return to Hogwarts School of Witchcraft and Wizardry for their third year of study, where they delve into the mystery surrounding an escaped prisoner who poses a dangerous threat to the young wizard.", 
            gross: "$249.36M",
            src: 'img/poster3.jpg'
        },
            {
            link: 'https://uakino.club/filmi/genre_adventure/209-garr-potter-kelih-vognyu.html',
            movieName:"Harry Potter and the Goblet of Fire", 
            year:"2005",
            Director:"Mike Newell", 
            duration:"157 min", 
            description: "Harry Potter finds himself competing in a hazardous tournament between rival schools of magic, but he is distracted by recurring nightmares.", 
            gross: "$290.01M",
            src: 'img/poster4.jpg'
        },
        {
            link: 'https://uakino.club/filmi/genre_adventure/281-garr-potter-ta-orden-fenksa.html',
            movieName:"Harry Potter and the Order of the Phoenix", 
            year:"2007",
            Director:"David Yates", 
            duration:"138 min", 
            description: "With their warning about Lord Voldemort's return scoffed at, Harry and Dumbledore are targeted by the Wizard authorities as an authoritarian bureaucrat slowly seizes power at Hogwarts.", 
            gross: "$292.00M",
            src: 'img/poster5.jpg'
        },
        {
            link: 'https://uakino.club/filmi/genre_adventure/234-garr-potter-napvkrovniy-princ.html',
            movieName:"Harry Potter and the Half-Blood Prince", 
            year:"2009",
            Director:"David Yates", 
            duration:"153 min", 
            description: "As Harry Potter begins his sixth year at Hogwarts, he discovers an old book marked as 'the property of the Half-Blood Prince' and begins to learn more about Lord Voldemort's dark past.", 
            gross: "$301.96M",
            src: 'img/poster6.jpg'
        },
        {
            link: 'https://uakino.club/filmi/genre_adventure/269-garr-potter-ta-smerteln-relkvyi-chastina-persha.html',
            movieName:"Harry Potter and the Deathly Hallows – Part 1", 
            year:"2010",
            Director:"David Yates", 
            duration:"146 min", 
            description: "As Harry, Ron, and Hermione race against time and evil to destroy the Horcruxes, they uncover the existence of the three most powerful objects in the wizarding world: the Deathly Hallows.", 
            gross: "$295.98M",
            src: 'img/poster7.jpg'
        },
         {
            link: 'https://uakino.club/filmi/genre_adventure/68-garr-potter-ta-smerteln-relkvyi-chastina-druga.html',
            movieName:"Harry Potter and the Deathly Hallows – Part 2", 
            year:"2011",
            Director:"David Yates", 
            duration:"130 min", 
            description: "Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.", 
            gross: "$381.01M",
            src: 'img/poster8.jpg'
        }    
    ]

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
                createTitle(title, secondTitle,`${categories[0]} characters`, '');
                insertInfo(charactersInfo,boxBanner);
                arrSort = charactersInfo;
                break;
            }
            case '1': {
                createTitle(title, secondTitle,categories[1], '');
                insertInfo(studentsInfo,boxBanner);
                arrSort = studentsInfo;
                break;
            }
            case '1.0':{
                createTitle(title, secondTitle,categories[1], studentGender[0]);
                let arr = [];
                for(let i = 0; i < studentsInfo.length; i++){
                    if(studentsInfo[i].gender == 'male'){
                        arr.push(studentsInfo[i]);
                    }
                }
                insertInfo(arr, boxBanner);
                arrSort = arr;
                break;
            }
            case '1.1':{
                createTitle(title, secondTitle, categories[1], studentGender[1]);
                let arr = [];
                for(let i = 0; i < studentsInfo.length; i++){
                    if(studentsInfo[i].gender == 'female'){
                        arr.push(studentsInfo[i]);
                    }
                }
                insertInfo(arr, boxBanner);
                arrSort = arr;
                break;
            }
            case '2': {
                createTitle(title, secondTitle, categories[2], '');
                insertInfo(staffInfo,boxBanner);
                arrSort = staffInfo;
                break;
            } 
            case '3': {
                createTitle(title, secondTitle, categories[3], '');
                insertInfo(charactersInfo,boxBanner);
                arrSort = charactersInfo;
                break;
            }
            case '3.0': {
                createTitle(title, secondTitle, categories[3], houseName[0]);
                let arr = [];
                for(let i = 0; i < charactersInfo.length; i++){
                    if(charactersInfo[i].house == 'Gryffindor'){
                        arr.push(charactersInfo[i]);
                    }
                }
                insertInfo(arr, boxBanner);
                arrSort = arr;
                break;
            }
            case '3.1': {
                createTitle(title, secondTitle, categories[3], houseName[1]);
                let arr = [];
                for(let i = 0; i < charactersInfo.length; i++){
                    if(charactersInfo[i].house == 'Slytherin'){
                        arr.push(charactersInfo[i])
                    }
                }
                insertInfo(arr, boxBanner);
                arrSort = arr;
                break;
            }
            case '3.2': {
                createTitle(title, secondTitle, categories[3], houseName[2]);
                let arr = [];
                for(let i = 0; i < charactersInfo.length; i++){
                    if(charactersInfo[i].house == 'Ravenclaw'){
                        arr.push(charactersInfo[i])
                    }
                }
                insertInfo(arr, boxBanner);
                arrSort = arr;
                break;
            }
            case '4': {
                createTitle(title, secondTitle, categories[4], '');
                document.querySelector('.sort-box').style.display = 'none';
                createGallery(boxBanner);
                break;
            }
            case '5': {
                createTitle(title, secondTitle, categories[5], '');
                document.querySelector('.sort-box').style.display = 'none';
                let moviesBox = createContainer('.container-persons', '.container-gallery', 'container-movies');
                for(let i = 0; i<movies.length; i++){
                    createMovies(moviesBox, movies[i]);
                }
                boxBanner.insertAdjacentElement('afterend',moviesBox)
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
                insertInfo(arrSort, boxBanner)
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
                insertInfo(arrSort, boxBanner)
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
            insertInfo(arrSort, boxBanner) 
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
            insertInfo(arrSort, boxBanner) 
        })
    })

    search.addEventListener('input', function(){
        let valueInput = search.value;
        title.textContent = 'Search';
        boxBanner.insertAdjacentElement('beforeend', createSortBox(boxBanner));
        title.classList.add('title-affect');
        boxBanner.style.height = '350px';
        let arrSearch = [];
        for(let i = 0; i<charactersInfo.length; i++){
            if(charactersInfo[i].name.toLowerCase().includes(valueInput)){
                arrSearch.push(charactersInfo[i])
            }
        }
        if(arrSearch != 0){
            insertInfo(arrSearch, boxBanner);
         }
         if(arrSearch.length == 0){
           let notFound = document.createElement('h2')
           notFound.classList.add('info-search')
           notFound.textContent = `Sorry, but '${search.value}' the character is not found`;
           let container = createContainer('container-gallery', '.container-movies', 'container-persons');
           container.insertAdjacentElement('beforeend', notFound)
           boxBanner.insertAdjacentElement('afterend', container)
        }
    })
    search.addEventListener('blur', function(){
        search.value= '';
    })
    boxBanner.insertAdjacentElement('afterend', createFooter());
})

function createContainer(classRemove1, classRemove2, classCreate){
    if(document.querySelector(classRemove1)){
        document.body.removeChild(document.querySelector(classRemove1));
    }
    if(document.querySelector(classRemove2)){
        document.body.removeChild(document.querySelector(classRemove2));
    }
    if(document.querySelector(`.${classCreate}`)){
        document.body.removeChild(document.querySelector(`.${classCreate}`));
    }
    let container = document.createElement('div');
    container.classList.add(classCreate);
    return container;
}

function createGallery(boxBanner){
    let imgSrc = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg', 'img/7.jpg', 'img/8.jpg','img/9.jpg', 'img/10.jpg', 'img/11.jpg', 'img/12.jpg']

    let containerGallery = createContainer('.container-persons', '.container-movies', 'container-gallery')

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

function insertInfo(infoPerson, boxBanner){
    let container = createContainer('.container-movies', '.container-gallery','container-persons');
    for(let i = 0; i < infoPerson.length; i++){
        container.insertAdjacentElement('beforeend', new Info(infoPerson[i]).print())
    }
    boxBanner.insertAdjacentElement('afterend', container);
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

function createTitle(title, secondTitle,categories, content){
    title.textContent = categories;
    secondTitle.textContent = content;
}

function createMovies(moviesBox, movies){
    let movieInfo = document.createElement('a');
    movieInfo.classList.add('block-info')
    let listInfo = document.createElement('ul');
    listInfo.classList.add('listInfo');
    let boxImg = document.createElement('div');
    boxImg.classList.add('img-box');
    let imgFilm = document.createElement('img');
    boxImg.insertAdjacentElement('afterbegin',imgFilm);

    for( let key in movies) {
        if(key != 'link' && key != 'movieName' && key != 'src'){
            createLiInfo(key, movies[key], listInfo)
        }
        if(key == 'movieName'){
            createLiInfo('', movies[key], listInfo)
        }
        if(key == 'src'){
            imgFilm.setAttribute('src', movies[key])
        }
        if(key == 'link'){
            movieInfo.setAttribute('href', movies[key])
            movieInfo.setAttribute('target', '_blank')
        }
    }
    movieInfo.insertAdjacentElement('beforeend', listInfo)
    movieInfo.insertAdjacentElement('afterbegin', boxImg)
    moviesBox.insertAdjacentElement('beforeend', movieInfo)
}

function createFooter(){
    let footerBox = document.createElement('div');
    footerBox.classList.add('footer')

    let socialNetworks = document.createElement('div');
    socialNetworks.classList.add('social')

    let socialArr = ['https://www.youtube.com/channel/UChPRO1CB_Hvd0TvKRU62iSQ', 'https://www.instagram.com/wizardingworld', 'https://twitter.com/wizardingworld', 'https://www.facebook.com/wizardingworld'];
    let classIcon = ['fab fa-youtube-square', 'fab fa-instagram-square', 'fab fa-twitter-square', 'fab fa-facebook-square']

    let footerSmall = document.createElement('small');
    footerSmall.textContent = '©2021 Fictional universe of Harry Potter. All Rights Reserved.';

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



