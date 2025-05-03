import Deployer from "./routes.deploy";

const { router } = new Deployer().execute();

export default router;