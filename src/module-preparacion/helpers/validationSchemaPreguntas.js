import { object, string } from "yup";
export const validationSchema = object({
	pregunta: string("Ingresa una pregunta").required("Este campo es requerido"),
	tipo: string("Selecciona el tipo").required("Este campo es requerido"),
	tipoCerrada: string().when("tipo", {
		is: "abierta",
		then: string(),
		otherwise: string().required("Debes seleccionar un tipo de respuesta cerrada"),
	}),
	respuesta1: string().when("tipoCerrada", {
		is: "personalizado1",
		then: string("Ingresa la opción de respuesta").required("Este campo es requerido"),
		otherwise: string().when("tipoCerrada", {
			is: "personalizado2",
			then: string("Ingresa la opción de respuesta").required("Este campo es requerido"),
			otherwise: string().when("tipoCerrada", {
				is: "personalizado3",
				then: string("Ingresa la opción de respuesta").required("Este campo es requerido"),
				otherwise: string().when("tipo", {
					is: "abierta",
					then: string(),
				}),
			}),
		}),
	}),
	respuesta2: string().when("tipoCerrada", {
		is: "personalizado1",
		then: string("Ingresa la opción de respuesta").required("Este campo es requerido"),
		otherwise: string().when("tipoCerrada", {
			is: "personalizado2",
			then: string("Ingresa la opción de respuesta").required("Este campo es requerido"),
			otherwise: string().when("tipoCerrada", {
				is: "personalizado3",
				then: string("Ingresa la opción de respuesta").required("Este campo es requerido"),
				otherwise: string().when("tipo", {
					is: "abierta",
					then: string(),
				}),
			}),
		}),
	}),
	respuesta3: string().when("tipoCerrada", {
		is: "personalizado2",
		then: string("Ingresa la opción de respuesta").required("Este campo es requerido"),
		otherwise: string().when("tipoCerrada", {
			is: "personalizado3",
			then: string("Ingresa la opción de respuesta").required("Este campo es requerido"),
			otherwise: string().when("tipo", {
				is: "abierta",
				then: string(),
			}),
		}),
	}),
	respuesta4: string().when("tipoCerrada", {
		is: "personalizado3",
		then: string("Ingresa la opción de respuesta").required("Este campo es requerido"),
		otherwise: string().when("tipo", {
			is: "abierta",
			then: string(),
		}),
	}),
	respuesta5: string().when("tipoCerrada", {
		is: "personalizado3",
		then: string("Ingresa la opción de respuesta").required("Este campo es requerido"),
		otherwise: string().when("tipo", {
			is: "abierta",
			then: string(),
		}),
	}),
});
