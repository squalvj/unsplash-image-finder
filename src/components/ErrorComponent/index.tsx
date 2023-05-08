function ErrorComponent({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex items-center justify-center flex-col">
      <p className="text-red-500">Oops something went wrong</p>
      <span onClick={onClick} className="cursor-pointer underline">
        Click here to try again
      </span>
    </div>
  );
}

export default ErrorComponent