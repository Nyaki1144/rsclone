import "../src/scss/style.scss";
import * as bootstrap from "bootstrap";
import { initSettingBtns } from "./modules/cv-render/settingshandlers";
import { drawCV } from "./modules/cv-render/drawcv";


initSettingBtns();
drawCV();