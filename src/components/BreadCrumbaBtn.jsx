import { Link } from "react-router-dom";

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center space-x-2 text-sm p-3 bg-white border-t-2 border-gray-300">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.path ? (
            <Link to={item.path} className="text-gray-500 hover:text-gray-700">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-gray-800">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="mx-2">/</span>}
        </div>
      ))}
    </nav>
  );
}
