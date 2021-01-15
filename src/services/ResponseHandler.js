import { plainToClass } from "class-transformer";

const success = (response, Model) => {
    return {
        data: Model ? toModel(Model, response["Message"]) : response["Message"] || response["data"],
        success: true
    };
};

const error = (response) => {
    return { data: [], success: false, error: response["Message"] || response["message"] };
};

const toModel = (Model, data) => {
    return plainToClass(Model, data);
};

export { success, error };
