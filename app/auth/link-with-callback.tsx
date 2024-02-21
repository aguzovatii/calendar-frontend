import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function LinkWithCallback({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <InternalLinkWithCallback href={href} className={className}>
        {children}
      </InternalLinkWithCallback>
    </Suspense>
  );
}

function InternalLinkWithCallback({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const [urlWithParams, setUrlWithParams] = useState(href);

  useEffect(() => {
    if (searchParams.has("callbackUrl")) {
      setUrlWithParams(
        href +
          "?callbackUrl=" +
          encodeURIComponent(searchParams.get("callbackUrl")!),
      );
    }
  }, [searchParams, urlWithParams]);

  return (
    <Link href={urlWithParams} className={className}>
      {children}
    </Link>
  );
}
