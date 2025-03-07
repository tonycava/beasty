export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const focusOnMount = (node: any) => {
	// This will run after the component is mounted
	node.focus();

	return {};
};
