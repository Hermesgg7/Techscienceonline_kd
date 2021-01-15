import axios from './Axios';
import { error, success } from "./ResponseHandler";

const RESPONSE_TYPE = { responseType: 'text' };
const { REACT_APP_BASE_API_URL } = process.env;
const TEXT_TO_SPEECH_URL = REACT_APP_BASE_API_URL + "";

class BoardService {
  async getTextToSpeech(payload = {}) {
    try {
      const url = `${TEXT_TO_SPEECH_URL}http://api.voicerss.org/?key=025897b8f08344a5add12b0a484ae8c1&hl=en-us&c=MP3&f=16khz_16bit_stereo&b64=true&src=${payload.text}`;
      const response = await axios.get(url, RESPONSE_TYPE);

      return success({ data: response });
    } catch (e) {
      return error(e);
    }
  }

  async getSvgString(url = '') {
    try {
      const response = await axios.get(url, RESPONSE_TYPE);

      return success({ data: response });
    } catch (e) {
      return error(e);
    }
  }
}

export default new BoardService();
