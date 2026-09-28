# Campus Connect Web

Panel web administrativo para centralizar solicitudes universitarias, recursos y reportes.

## Ejecutar

Sirve la carpeta `dist` con cualquier servidor HTTP local. La información de demostración se conserva en `localStorage`.

## Pruebas

```bash
node --test tests/domain.test.mjs
```

## Alcance

- Dashboard administrativo.
- CRUD de solicitudes.
- Cambio de estado, prioridad y responsable.
- Gestión de recursos institucionales.
- Reportes resumidos y exportación CSV.
- Validaciones y manejo de errores en formularios.

No incluye aplicación móvil ni backend/API.
