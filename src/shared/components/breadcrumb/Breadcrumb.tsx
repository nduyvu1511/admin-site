import { Link } from 'react-router-dom';

interface IBreadcrumb {
  parentPage: string;
  childPage?: string;
}

const Breadcrumb = ({ parentPage, childPage }: IBreadcrumb) => {
  return (
    <div className="flex items-center dark:text-dark-text-bold text-light-text text-sm tracking-[0.4px]">
      <Link className="font-normal hidden sm:block" to={parentPage}>
        {parentPage}
      </Link>
      <span className="mx-1 hidden sm:block">/</span>
      <p className="font-medium capitalize">{childPage}</p>
    </div>
  );
};

export default Breadcrumb;
