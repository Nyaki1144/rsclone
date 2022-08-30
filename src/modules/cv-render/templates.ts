import { cvPreferences } from "./settingshandlers";

export const templates = [
  {
    headerSettings: {
      titlesize: 40,
      subtitlesize: 20,
      titlefont: (!cvPreferences || cvPreferences.font === 'default') ? 'Times New Roman' : cvPreferences.font,
      titlecolor: 'white',
      subtitlefont: 'Times New Roman',
      subtitlecolor: '#d3d3d3',
    },
    mainSettings: {
      template: 1,
      sidebar: 'right',
      textsize: 14,
      headersize: 20,
      font: 'Times New Roman',
      textcolor: 'black',
      headercolor: '#47566B',
    }
  },
  {
    headerSettings: {
      titlesize: 35,
      subtitlesize: 18,
      titlefont: (!cvPreferences || cvPreferences.font === 'default') ? 'Verdana' : cvPreferences.font,
      titlecolor: '#000',
      subtitlefont: 'Verdana',
      subtitlecolor: 'grey',
    },
    mainSettings: {
      template: 2,
      sidebar: 'left',
      textsize: 14,
      headersize: 20,
      font: 'Verdana',
      textcolor: 'grey',
      headercolor: '#d3d3d3',
    }
  }
]