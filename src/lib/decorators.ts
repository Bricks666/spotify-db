export const logged = () => {
	console.log("ADD LOG");
	return (
		_target: any,
		_propKey: string | symbol,
		description: TypedPropertyDescriptor<any>
	): TypedPropertyDescriptor<any> => {
		const method: Function = description.value;
		description.value = async function (...args: any[]) {
			console.log("LOGGING");
			const result: any = await method.apply(this, args);
			console.log(result);
			return result;
		};

		return description;
	};
};

export const tryCatch = () => {
	console.log("ADD TRY");
	return (
		_target: any,
		_propertyKey: string | symbol,
		description: TypedPropertyDescriptor<any>
	) => {
		const method: Function = description.value;
		console.log(method);
		description.value = async function (...args: any[]) {
			console.log("decorator tryCATCH");
			try {
				return await method.apply(this, args);
			} catch (e: any) {
				console.log(e.message);
			}
		};

		return description;
	};
};
