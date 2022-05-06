import request from "../utils/request";
export const getDetail = ({url,method, data})=> {
   return  request({
        url,
        method,
        data,
    }).then(({ code, data, msg }) => {
        if (code == 0) {
            let formData = JSON.parse(data.form_content);

            formData.advance_attribute = JSON.parse(
                formData.advance_attribute
            );
            formData.basic_attribute = JSON.parse(
                formData.basic_attribute
            );

            formData.field_content = JSON.parse(
                formData.field_content
            );
            return { code, formData, msg }
        }else{
            return { code, data, msg }
        }
    });
}
