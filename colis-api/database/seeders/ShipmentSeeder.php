<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Shipment;

class ShipmentSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'idBordereau' => 1,
                'codeBordereau' => 'EXP-443318',
                'dateDepot' => '2026-03-31 08:46:19',
                'libville' => 'casablanca',
                'libelle' => 'En cours',
                'dernierStatut' => 'enc',
                'amountCrbt' => 0.00,
                'nomDest' => 'Oumaima',
                'telDest' => '0643580576',
                'adresseDest' => 'casablanca, maroc',
                'dateLastStatus' => null,
                'datePaiement' => null,
            ],
            [
                'idBordereau' => 2,
                'codeBordereau' => 'EXP-266759',
                'dateDepot' => '2026-03-31 09:02:24',
                'libville' => 'casablanca',
                'libelle' => 'En cours',
                'dernierStatut' => 'enc',
                'amountCrbt' => 10000.00,
                'nomDest' => 'Oumaima',
                'telDest' => '0643580576',
                'adresseDest' => 'casablanca, maroc',
                'dateLastStatus' => null,
                'datePaiement' => null,
            ],
            [
                'idBordereau' => 3,
                'codeBordereau' => 'EXP-184714',
                'dateDepot' => '2026-03-31 09:46:07',
                'libville' => 'rabat',
                'libelle' => 'En cours',
                'dernierStatut' => 'enc',
                'amountCrbt' => 9871.00,
                'nomDest' => 'karima',
                'telDest' => '0123498031',
                'adresseDest' => 'said hajji , 191',
                'dateLastStatus' => null,
                'datePaiement' => null,
            ],
            [
                'idBordereau' => 4,
                'codeBordereau' => 'EXP-214181',
                'dateDepot' => '2026-03-31 10:04:31',
                'libville' => 'Agadir',
                'libelle' => 'En cours',
                'dernierStatut' => 'enc',
                'amountCrbt' => 21000.00,
                'nomDest' => 'youssra',
                'telDest' => '0893421328',
                'adresseDest' => 'hay lfarah, 23',
                'dateLastStatus' => null,
                'datePaiement' => null,
            ],
            [
                'idBordereau' => 5,
                'codeBordereau' => 'EXP-442279',
                'dateDepot' => '2026-03-31 23:00:01',
                'libville' => 'KENITRA',
                'libelle' => 'En cours',
                'dernierStatut' => 'enc',
                'amountCrbt' => 1342.00,
                'nomDest' => 'hayat',
                'telDest' => '0987892341',
                'adresseDest' => 'kenitra khebazat, 23',
                'dateLastStatus' => null,
                'datePaiement' => null,
            ],
            [
                'idBordereau' => 6,
                'codeBordereau' => 'EXP-427069',
                'dateDepot' => '2026-03-31 23:00:53',
                'libville' => 'rabat',
                'libelle' => 'En cours',
                'dernierStatut' => 'enc',
                'amountCrbt' => 2340.00,
                'nomDest' => 'oumaima',
                'telDest' => '0987879087',
                'adresseDest' => 'rabat hassa,90',
                'dateLastStatus' => null,
                'datePaiement' => null,
            ],
            [
                'idBordereau' => 7,
                'codeBordereau' => 'EXP-718270',
                'dateDepot' => '2026-03-31 23:03:01',
                'libville' => 'agadir',
                'libelle' => 'En cours',
                'dernierStatut' => 'enc',
                'amountCrbt' => 1000.00,
                'nomDest' => 'mohamed',
                'telDest' => '0983241430',
                'adresseDest' => 'agadir hay lfarah, 80',
                'dateLastStatus' => null,
                'datePaiement' => null,
            ],
            [
                'idBordereau' => 8,
                'codeBordereau' => 'EXP-610999',
                'dateDepot' => '2026-04-01 08:33:30',
                'libville' => 'sale',
                'libelle' => 'En cours',
                'dernierStatut' => 'enc',
                'amountCrbt' => 10000.30,
                'nomDest' => 'taha',
                'telDest' => '0987909872',
                'adresseDest' => 'said rahma, 90',
                'dateLastStatus' => null,
                'datePaiement' => null,
            ],
        ];

        foreach ($data as $item) {
            Shipment::create($item);
        }
    }
}
