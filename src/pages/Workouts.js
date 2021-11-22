function WorkoutCard() {
  return (
    <div className="flex w-full flex-col rounded p-5 bg-gray-50">
      <div className="flex pb-5">Workout Title</div>
      <div>Exercise x 5</div>
      <div>Exercise x 5</div>
      <div>Exercise x 5</div>
      <div>Exercise x 5</div>
      <div>Exercise x 5</div>
      <div>Exercise x 5</div>
    </div>
  );
}

function Workouts() {
  return (
    <div className="relative flex flex-col w-full h-screen overflow-auto p-10">
      <div className="text-blue-500 text-4xl font-bold pb-5 relative">
        Workouts
      </div>
      <div className="grid grid-cols-4 gap-5 ">
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
      </div>
    </div>
  );
}

export default Workouts;
