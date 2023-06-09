import LayoutHeader from "./header/header";
import LayoutSidebar from "./sidebar/sidebar";
import { Outlet } from "react-router-dom";
import SetPageTitle from "hooks/set-page-title";
import { useEffect, useState } from "react";
import { localStorageProvider } from "utility/local-storage-provider";

interface ILayout {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	outlet?: any;
}

export default function Layout(props: ILayout): JSX.Element {
	const [menuMode, setmenuMode] = useState("");

	const selectedMenuMode = localStorageProvider<string | undefined>("menuMode");

	useEffect(() => {
		const mode = selectedMenuMode.get();
		if (mode) setmenuMode(mode);
	}, [selectedMenuMode]);

	const toggleMenuMode = () => {
		const mode = menuMode == "collapsed" ? "open" : "collapsed";
		selectedMenuMode.set(mode);
		setmenuMode(mode);
	};

	return (
		<div>
			<SetPageTitle />
			<LayoutHeader onMenuButtonClick={toggleMenuMode} />
			<div id="content" className="flex-container">
				<LayoutSidebar menuMode={menuMode} />
				{/* hack to allow error page be rendered inside the layout
            		https://github.com/remix-run/react-router/discussions/9553#discussioncomment-4907035 */}
				<div id="page-content">{props.outlet ? props.outlet : <Outlet />}</div>
			</div>
		</div>
	);
}
