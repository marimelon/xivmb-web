const changeFavicon = (link: any) => {
    let $favicon = document.querySelector('link[rel="icon"]');
    if ($favicon !== null) {
        ($favicon as any).href = link;
    }
    else {
        $favicon = document.createElement("link");
        ($favicon as any).rel = "icon";
        ($favicon as any).href = link;
        document.head.appendChild($favicon);
    }
};
export default changeFavicon;
