export default function makeCrudRoutes({
    entity,
    components: { FormContainer, ListingContainer }
  }) {
    let arr = [
      {
        path: `/${entity.name}/list`,
        name: `${entity.label}List`,
        component: ListingContainer,
        props: {
            entity,
        },
      },
      {
        path: `/${entity.name}/:id`,
        name: `${entity.label}Form`,
        component: FormContainer,
        props: route => ({ entity, id: route.params.id }),
      },
    ];
    return arr;
  }