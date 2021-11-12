import axios, { AxiosPromise } from "axios";

const methods: Array<"post" | "get"> = ["get", "post"];
type Methods = typeof methods[number];

type Instance = {
    [p in Methods]: (url: string, data: any) => AxiosPromise;
};

const instance = methods.reduce((previousValue, currentValue) => {
    previousValue[currentValue] = (url, data) => {
        if (currentValue === "get") {
            return axios[currentValue](url, { params: data });
        } else {
            return axios[currentValue](url, data);
        }
    };
    return previousValue;
}, {} as Instance);

instance
    .get("https://jsonplaceholder.typicode.com/todos/1", null)
    .then((response) => console.log(response));