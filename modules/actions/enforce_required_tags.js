
export function actionEnforceRequiredTags(createdEntites, requiredTags) {
  requiredTags = requiredTags || {};

  return (graph) => {
    createdEntites.forEach(checkTags);
    return graph;

    function checkTags(entity) {
      let didAdd = false;
      let tags = {};
      for (var key in entity.tags) {
        tags[key] = entity.tags[key];
      }
      for (var key in requiredTags) {
        if (!tags[key] || tags[key] !== requiredTags[key]) {
          didAdd = true;
          tags[key] = requiredTags[key];
        }
      }
      if (didAdd) {
        graph = graph.replace(entity.update({ tags: tags }));
      }
    }

  };
}
