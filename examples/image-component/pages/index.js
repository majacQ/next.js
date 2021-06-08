import styles from '../styles.module.css'
import Image from 'next/image'
  <<<<<<< snyk-fix-baf02dc20bc4341160f02eecf39c6991
import Link from 'next/link'
import ViewSource from '../components/view-source'
  =======
  >>>>>>> ch13148/image-docs

const Code = (p) => <code className={styles.inlineCode} {...p} />

const Index = () => (
  <div className={styles.container}>
  <<<<<<< snyk-fix-baf02dc20bc4341160f02eecf39c6991
    <ViewSource pathname="pages/index.js" />
    <div className={styles.card}>
      <h1>Image Component with Next.js</h1>
      <p>
        This page demonstrates the usage of the{' '}
        <a href="https://nextjs.org/docs/api-reference/next/image">
          next/image
        </a>{' '}
        component with live examples.
      </p>
      <p>
        This component is designed to{' '}
        <a href="https://nextjs.org/docs/basic-features/image-optimization">
          automatically optimize
        </a>{' '}
        images on-demand as the browser requests them.
      </p>
      <hr className={styles.hr} />
      <h2 id="layout">Layout</h2>
      <p>
        The <Code>layout</Code> property tells the image to respond differently
        depending on the device size or the container size.
      </p>
      <p>
        Select a layout below and try resizing the window or rotating your
        device to see how the image reacts.
      </p>
      <ul>
        <li>
          <Link href="/layout-intrinsic">
            <a>layout="intrinsic"</a>
          </Link>
        </li>
        <li>
          <Link href="/layout-responsive">
            <a>layout="responsive"</a>
          </Link>
        </li>
        <li>
          <Link href="/layout-fixed">
            <a>layout="fixed"</a>
          </Link>
        </li>
        <li>
          <Link href="/layout-fill">
            <a>layout="fill"</a>
          </Link>
        </li>
        <li>
          <Link href="/background">
            <a>background demo</a>
          </Link>
        </li>
      </ul>
      <hr className={styles.hr} />
      <h2 id="internal">Internal Image</h2>
  =======
    <div className={styles.card}>
      <h1>Image Component with Next.js</h1>
      <p>
        The images below use the{' '}
        <a href="https://nextjs.org/docs/api-reference/next/image">
          &lt;Image&gt;
        </a>{' '}
        component to ensure optimal format and size for this browser.
      </p>
      <p>
        Images are also lazy loaded by default which means they don't load until
        scrolled into view.
      </p>
      <p>Try scolling down to try it out!</p>
      <hr className={styles.hr} />
  >>>>>>> ch13148/image-docs
      <p>
        The following is an example of a reference to an interal image from the{' '}
        <Code>public</Code> directory.
      </p>
      <p>
  <<<<<<< snyk-fix-baf02dc20bc4341160f02eecf39c6991
        This image is intentionally large so you have to scroll down to the next
        image.
      </p>
      <Image alt="Vercel logo" src="/vercel.png" width={1000} height={1000} />
      <hr className={styles.hr} />
      <h2 id="external">External Image</h2>
  =======
        Notice that the image is responsive. As you adjust your browser width, a
        different sized image is loaded.
      </p>
      <Image alt="Vercel logo" src="/vercel.png" width={1000} height={1000} />
      <hr className={styles.hr} />
  >>>>>>> ch13148/image-docs
      <p>
        The following is an example of a reference to an external image at{' '}
        <Code>assets.vercel.com</Code>.
      </p>
      <p>
        External domains must be configured in <Code>next.config.js</Code> using
  <<<<<<< snyk-fix-baf02dc20bc4341160f02eecf39c6991
        the <Code>domains</Code> property.
      </p>
      <Image
        alt="Next.js logo"
        src="https://assets.vercel.com/image/upload/v1538361091/repositories/next-js/next-js-bg.png"
  =======
        the <Code>domains</Code>.
      </p>
      <Image
        alt="Next.js logo"
        src="https://assets.vercel.com/image/upload/v1538361091/repositories/next-js/next-js.png"
  >>>>>>> ch13148/image-docs
        width={1200}
        height={400}
      />
      <hr className={styles.hr} />
  <<<<<<< snyk-fix-baf02dc20bc4341160f02eecf39c6991
      <h2 id="more">Learn More</h2>
      <p>
        You can optionally configure a cloud provider, device sizes, and more!
      </p>
      <p>
        Checkout the{' '}
        <a href="https://nextjs.org/docs/basic-features/image-optimization">
          Image Optimization documentation
        </a>{' '}
        to learn more.
      </p>
  =======
      Checkout the documentation for{' '}
      <a href="https://nextjs.org/docs/basic-features/data-fetching">
        Image Optimization
      </a>{' '}
      to learn more.
  >>>>>>> ch13148/image-docs
    </div>
  </div>
)

export default Index
