import Link from "next/link";
import { useRouter } from "next/router";

export default function SettingsNavBar(props) {
    const inactiveLink = 'flex gap-1 items-center p-0';
    const activeLink = inactiveLink + ' Shadow-btm';
    const router = useRouter();
    const { pathname } = router;

    return (
        <div className="w-full flex justify-center">
            <div className="flex justify-around items-center w-full max-w-xl border border-1 py-1 rounded-md">
                {props.list.length > 0 && props.list.map((element, index) => (
                    <Link className={pathname.includes(element.url) ? activeLink : inactiveLink} key={index} href={element.url}>
                            {element.titre}
                    </Link>
                ))}
            </div>
        </div>
    );
}
