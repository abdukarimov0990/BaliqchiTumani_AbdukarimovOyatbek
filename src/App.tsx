import { MaterialTable } from "./components/MaterialTable";
import { getAllMaterials } from "./utils/materials";

export default function App() {
  return (
    <>
      <header>
        <h1>Qurilishdan ortgan materiallar savdosi</h1>
      </header>
      <main>
        <MaterialTable materials={getAllMaterials()} />
      </main>
    </>
  );
}
