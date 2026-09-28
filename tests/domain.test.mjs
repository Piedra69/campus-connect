import test from 'node:test';
import assert from 'node:assert/strict';
import { csvFor, nextCode, summarize, validateRequest } from '../dist/domain.mjs';

test('valida campos obligatorios', () => assert.equal(Object.keys(validateRequest({})).length, 4));
test('acepta una solicitud válida', () => assert.deepEqual(validateRequest({ title: 'Proyector', category: 'Equipamiento', location: 'Aula B-12', description: 'La imagen se apaga durante la clase.' }), {}));
test('genera el siguiente código', () => assert.equal(nextCode([{ code: 'SOL-0010' }, { code: 'SOL-0003' }]), 'SOL-0011'));
test('resume estados y tiempo', () => assert.deepEqual(summarize([{ status: 'Pendiente', hours: 2 }, { status: 'Cerrada', hours: 6 }]), { total: 2, pending: 1, active: 0, closed: 1, avgHours: 4 }));
test('escapa comillas al exportar CSV', () => assert.match(csvFor([{ code: '1', title: 'Aula "A"' }]), /Aula ""A""/));
