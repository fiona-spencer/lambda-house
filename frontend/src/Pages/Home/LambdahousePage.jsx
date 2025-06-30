import House from './House'; // Make sure this import is correct

export default function LambdahousePage() {
  return (
    <div className="space-y-12">
      {sections.map(({ title, component: Component }, idx) => (
        <div key={idx}>
          <div className="text-4xl font-bold text-black mb-6 ml-10">{title}</div>
          <Component />
        </div>
      ))}

      {/* Responsive layout for House components */}
      <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-6 items-center space-y-6 sm:space-y-0">
        <House />
        <House />
        <House />
      </div>
    </div>
  );
}
