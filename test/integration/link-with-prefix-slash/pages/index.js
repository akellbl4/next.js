import React from 'react'
import Link from 'next/link'

export default function Hello() {
  return (
    <div>
      <Link href="/">
        <a id="slash-link">Root</a>
      </Link>
      <br />
      <Link href="">
        <a id="empty-link">Empty</a>
      </Link>
      <Link href="about">
        <a id="path-without-slash">Without slash</a>
      </Link>
      <Link href="/about">
        <a id="path-with-slash">With slash</a>
      </Link>
      <Link href="http://acme.com/about">
        <a id="full-url">Full url</a>
      </Link>
    </div>
  )
}
