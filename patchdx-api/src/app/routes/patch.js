import { Router } from 'express';
import patchController from '../controllers/patchController';

export default () => {
  const patchRouter = Router();

  patchRouter.get('/search-individual-allergen', patchController.getIndividualAllergen);
  patchRouter.get('/search-group-allergen', patchController.getGroupAllergen);
  patchRouter.post('/submit-patch-order', patchController.submitPatchOrder);
  patchRouter.get('/fetch-patch-order', patchController.fetchPathOrders);
  patchRouter.get('/fetch-vendor-test-order', patchController.fetchVendorOrderTests);
  patchRouter.get('/fetch-patch-test-results', patchController.fetchPatchResults);
  patchRouter.get('/fetch-reacted-allergens', patchController.fetchReactedAllergens);
  patchRouter.post('/submit-vendor-order-summary', patchController.submitVendorOrderSummary);

  return patchRouter;
};
