/*
export async function getCvData(){
  let response = await fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');
  if (response.status === 200) {
    return await response.json();
  }
}
*/

type dataCV = {
  [key: string]: any; 
}

export let currentLetterData: dataCV = {
  "id": 0,
  "preferences": {
    "template": 1,
    "font": "default",
    "fontsize": "default",
    "color": "default"
  },
  "firstname": "Jon",
  "lastname": "Snow",
  "email": "winterfell@gmail.com",
  "tel": "+123-456-7890",
  "title": "letter theme",
  "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, \nwhen an unknown printer took a galley of type and scrambled it to make a \ntype specimen book. It has survived not only five centuries, but also \nthe leap into electronic typesetting, remaining essentially unchanged. \nIt was popularised in the 1960s with the release of Letraset sheets containing \nLorem Ipsum passages, and more recently with desktop publishing software \nlike Aldus PageMaker including versions of Lorem Ipsum.",
}

export let currentCVData: dataCV = {
    "cvId": 0,
    "preferences": {
      "template": 0,
      "font": "default",
      "fontsize": "default",
      "color": "default"
    },
    "firstname": "Jon",
    "lastname": "Snow",
    "email": "winterfell@gmail.com",
    "tel": "+123-456-7890",
    "address": "near the wall",
    "about": "Jon Snow is introduced as the 14-year-old illegitimate \nson of Eddard Ned Stark, Lord of Winterfell",
    "subtitle": "king of the north",
    "education": [
      {
        "title": "System technologies",
        "school": "University of North Lands",
        "location": "North Lands",
        "begin": "Jun 2010",
        "end": "Jul 2015",
        "description": "to add some description"
      },
      {
        "title": "High school",
        "school": "School of North Lands",
        "location": "Winterfell",
        "begin": "Jun 1995",
        "end": "Jul 2006",
        "description": "learning from home"
      }
    ],
    "employment": [
      {
        "position": "Engineer",
        "employer": "Great wall inc",
        "location": "Westeros",
        "begin": "Aug 2015",
        "end": "Present",
        "description": "some job responsibilities here \ncan be several lines"
      },
      {
        "position": "Wall defender",
        "employer": "Wall castle",
        "location": "North",
        "begin": "Jul 2006",
        "end": "Jul 2015",
        "description": "Worked as wall defender"
      }
    ],
    "skills": [
      {
        "skill": "HTML",
        "level": 4
      },
      {
        "skill": "JS",
        "level": 3
      },
      {
        "skill": "GIT",
        "level": 3
      }
    ],
    "languages": [
      {
        "language": "english",
        "level": 4
      },
      {
        "language": "russian",
        "level": 5
      },
      {
        "language": "chinese",
        "level": 3
      }
    ]
  }
