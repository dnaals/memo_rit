"use client";
import Link from 'next/link';
import '../style/header.scss';
import { usePathname } from 'next/navigation';

function Header() {
    const url = usePathname()

    return (
        <header>
              <h1>Memo-Rit</h1>
              <nav>
                <Link href="/" className={url=="/"?"active":""}>Note</Link>
                <Link href="/todo" className={url=="/todo"?"active":""}>TodoList</Link>
              </nav>
        </header>
    );
}

export default Header;