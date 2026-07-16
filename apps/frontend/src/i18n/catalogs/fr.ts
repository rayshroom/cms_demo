import type { en } from "./en";
import type { TranslationShape } from "../types";

export const fr = {
  document: {
    title: "Plateforme de données TDS",
    description:
      "Plateforme de données TDS — services de données, d’analytique et d’IA d’entreprise réunis dans une plateforme gouvernée."
  },
  language: {
    label: "Langue",
    english: "Anglais",
    french: "Français"
  },
  hero: {
    badge: "Plateforme de données et d’IA d’entreprise",
    titleBefore: "Accélérez les",
    titleHighlight: "données d’entreprise fiables",
    titleAfter: "et les flux de travail d’IA",
    description:
      "Découvrez des jeux de données gouvernés, des analyses prêtes pour l’IA, des outils d’intégration et des services de plateforme d’entreprise dans un écosystème unifié conçu pour évoluer.",
    getStarted: "Commencer",
    watchDemo: "Voir la démo",
    dashboard: {
      ariaLabel: "Tableau de bord de la plateforme",
      metrics: [
        { label: "Jeux de données", value: "48 M+", detail: "↑ 23 % par rapport au mois dernier" },
        { label: "Utilisateurs actifs", value: "12 k", detail: "↑ 18 % par rapport au mois dernier" },
        { label: "Vol. d’ingestion", value: "5 To/jour", detail: "↑ 32 % par rapport au mois dernier" },
        { label: "Ingestion moyenne", value: "1,68 To", detail: "Pic à 16 h 15" }
      ],
      ingestionTitle: "Volume d’ingestion",
      ingestionRange: "7 derniers jours ▾",
      ingestionAriaLabel: "Graphique d’ingestion sur sept jours",
      ingestionDates: ["15 juin", "16 juin", "17 juin", "18 juin", "19 juin", "20 juin", "21 juin"],
      batch: "Lot",
      streaming: "Continu",
      manual: "Manuel",
      healthTitle: "Santé des jeux de données",
      healthAriaLabel: "92 pour cent en bonne santé",
      healthy: "Sain",
      warning: "Avertissement",
      critical: "Critique",
      operationsTitle: "État opérationnel",
      operational: "Opérationnel",
      services: [
        "Azure Data Factory",
        "Databricks",
        "Stockage de données",
        "Confluent Kafka",
        "Portail de données",
        "Services de soutien"
      ]
    }
  },
  platform: {
    title: "Plateforme",
    description:
      "Accédez à des fonctions de données, d’IA et d’analytique de calibre entreprise au moyen d’une expérience centralisée et gouvernée.",
    stats: [
      { value: "12 000+", label: "Utilisateurs actifs de la plateforme" },
      { value: "48 M+", label: "Jeux de données gouvernés chaque mois" },
      { value: "65 %", label: "Intégration plus rapide que l’ancien système" },
      { value: "4 500+", label: "Heures économisées grâce à l’automatisation" },
      { value: "99,95 %", label: "Disponibilité de la plateforme (90 derniers jours)" }
    ],
    capabilities: [
      {
        title: "Gouvernance unifiée des données",
        description:
          "Définissez et appliquez les politiques d’accès, suivez la traçabilité des données de la source à l’analyse et assurez la conformité de toute la plateforme à partir d’un seul plan de contrôle.",
        tags: ["Traçabilité", "Contrôle d’accès", "Unity Catalog", "Audit"],
        action: "Gérer la gouvernance →",
        status: "Actif"
      },
      {
        title: "Analytique en libre-service",
        description:
          "Permettez aux équipes d’affaires d’interroger et d’explorer les jeux de données gouvernés sans attendre l’ingénierie. Connectez directement votre outil de BI à la couche sémantique pour obtenir des analyses toujours à jour.",
        tags: ["Sans code", "Connexion BI", "Couche sémantique", "Dremio"],
        action: "Explorer les données →",
        status: "Actif"
      },
      {
        title: "Pipelines de données prêts pour l’IA",
        description:
          "Accélérez le développement de modèles avec des magasins de caractéristiques pré-gouvernés, des contrôles automatisés de la qualité des données et le suivi des expériences MLflow, intégrés au lakehouse d’entreprise.",
        tags: ["MLflow", "Feature Store", "AutoML", "Delta Live"],
        action: "Commencer à créer →",
        status: "Bêta"
      }
    ]
  },
  solutions: {
    title: "Solutions",
    description:
      "Explorez des outils, des flux de travail et des services sélectionnés pour accélérer l’intégration, l’analytique et la livraison entre les équipes.",
    featureEyebrow: "Plateforme",
    featureTitleFirst: "Outils de",
    featureTitleSecond: "données et d’IA",
    featureDescription:
      "Des plateformes de calibre entreprise pour l’analytique, l’exploration et l’apprentissage, toutes gouvernées à partir d’un seul portail.",
    featureAction: "Explorer tous les produits →",
    products: [
      {
        name: "Databricks",
        description:
          "Créez des analyses prêtes pour l’IA, des pipelines de données gouvernés et des flux de travail à l’échelle de l’entreprise à partir d’une plateforme lakehouse unifiée.",
        tags: ["Lakehouse", "Delta Lake", "MLflow", "Unity Catalog"],
        action: "Ouvrir Databricks →"
      },
      {
        name: "Databricks — Data Labs",
        description:
          "Formez-vous, expérimentez et explorez Databricks dans un environnement libre-service guidé, conçu pour l’intégration et l’apprentissage pratique.",
        tags: ["Intégration", "Laboratoires", "Flux de travail d’IA"],
        action: "Commencer l’exploration →"
      },
      {
        name: "Dremio",
        description:
          "Découvrez et interrogez des jeux de données d’entreprise fiables grâce à une couche de données sémantique haute performance conçue pour la rapidité et l’échelle.",
        tags: ["Maillage de données", "Couche sémantique", "Moteur SQL"],
        action: "Parcourir les données →"
      }
    ]
  },
  roadmap: {
    title: "Feuille de route",
    description:
      "Suivez les améliorations de la plateforme, les lancements de produits et les fonctionnalités à venir dans l’écosystème TDS.",
    controlsLabel: "Commandes de la feuille de route",
    searchLabel: "Rechercher dans la feuille de route",
    searchPlaceholder: "Rechercher dans la feuille de route…",
    productFilterLabel: "Filtrer par produit",
    products: {
      all: "Tous les produits",
      platform: "Plateforme",
      databricks: "Databricks",
      dremio: "Dremio",
      dataLab: "Laboratoire de données"
    },
    statusFilterLabel: "Filtrer par état",
    statuses: {
      all: "Tous les états",
      launched: "Terminé",
      inProgress: "En cours",
      planned: "Planifié"
    },
    boardView: "Vue en cartes",
    ganttView: "Gantt",
    loadingLabel: "Chargement de la feuille de route",
    loadError: "Impossible de charger le contenu de la feuille de route.",
    empty: "Aucun élément de la feuille de route ne correspond aux filtres sélectionnés.",
    upcoming: "À venir",
    inProgress: "En cours",
    complete: "terminés",
    quarters: {
      Q1: { long: "T1 · janv. – mars", short: "T1" },
      Q2: { long: "T2 · avr. – juin", short: "T2" },
      Q3: { long: "T3 · juill. – sept.", short: "T3" },
      Q4: { long: "T4 · oct. – déc.", short: "T4" }
    },
    noMatchingItems: "Aucun élément correspondant",
    initiative: "Initiative"
  },
  news: {
    title: "Actualités et mises à jour",
    description:
      "Restez au courant des dernières versions de la plateforme, des occasions de formation, des nouvelles fonctionnalités et des entretiens planifiés.",
    loadingLabel: "Chargement des actualités",
    loadError: "Impossible de charger les actualités.",
    fallbackTag: "Actualités",
    artwork: {
      featureAriaLabel: "Fonction de découverte de jeux de données par l’IA",
      featureBadge: "NOUVELLE FONCTION",
      featurePlatform: "PLATEFORME TDS",
      trainingAriaLabel: "Séance de formation Databricks",
      trainingHeader: "FORMATION SUR LA PLATEFORME TDS",
      trainingPartner: "× DATABRICKS DATA LABS",
      platformLead: "Responsable de la plateforme TDS",
      dataEngineeringLead: "Responsable de l’ingénierie des données",
      dataLabsTeam: "ÉQUIPE DATA LABS",
      releaseAriaLabel: "Version 2.6 de la plateforme TDS",
      releaseLabel: "VERSION 2.6",
      releasePlatform: "PLATEFORME DE DONNÉES TDS",
      maintenanceAriaLabel: "Entretien planifié de la plateforme",
      maintenanceBrand: "Plateforme de données TDS",
      scheduled: "Entretien",
      maintenance: "planifié"
    }
  },
  contact: {
    title: "Contact",
    description:
      "Communiquez avec l’équipe de soutien, consultez les ressources d’aide ou contactez-nous directement pour obtenir de l’assistance et des conseils d’intégration.",
    teams: {
      title: "Microsoft Teams",
      description:
        "Discutez en direct avec l’équipe de soutien de la plateforme dans votre espace de travail Teams d’entreprise.",
      action: "Ouvrir la discussion Teams →",
      artworkAriaLabel: "Illustration du soutien Microsoft Teams",
      artworkLabel: "MICROSOFT TEAMS"
    },
    knowledge: {
      title: "FAQ et base de connaissances",
      description:
        "Trouvez des réponses, des procédures et des guides d’intégration dans notre centre de connaissances libre-service.",
      action: "Parcourir la FAQ →",
      artworkAriaLabel: "Illustration de la base de connaissances",
      artworkLabel: "BASE DE CONNAISSANCES"
    },
    email: {
      title: "Courriel et téléphone",
      description:
        "Communiquez directement avec notre service de soutien pour les problèmes signalés, les rapports de bogues ou les questions de gouvernance.",
      artworkAriaLabel: "Illustration du soutien par courriel et téléphone",
      artworkLabel: "COURRIEL ET TÉLÉPHONE"
    }
  },
  footer: {
    sitemapTitle: "Plan du site",
    sitemapDescription:
      "Parcourez toutes les pages, tous les produits, les outils et les ressources de la plateforme grâce à une vue de navigation structurée.",
    homeAriaLabel: "Accueil de la plateforme de données TDS",
    brandSuffix: "Plateforme de données",
    tagline: "Flux de travail de données et d’IA d’entreprise dans un écosystème unifié conçu pour évoluer.",
    socialAriaLabel: "Canaux sociaux",
    sitemap: {
      products: "Produits",
      productDatabricks: "Databricks",
      productDataLabs: "Data Labs",
      productDremio: "Dremio",
      productAiServices: "Services d’IA",
      productPlatformStatus: "État de la plateforme",
      workspaces: "Espaces de travail",
      workspaceMine: "Mes espaces de travail",
      workspaceJoin: "Rejoindre un espace",
      workspaceCreate: "Créer un espace",
      workspaceManagement: "Gestion des espaces",
      workspaceLandingZone: "Zone d’atterrissage (ADLS)",
      workspaceDeployment: "Services de déploiement",
      resources: "Ressources",
      resourceTraining: "Formation et parcours d’apprentissage",
      resourceDocumentation: "Documentation",
      resourceArchitecture: "Guides d’architecture",
      resourceDemos: "Démos et présentations",
      resourceGovernance: "Guides de gouvernance",
      resourceFaqs: "FAQ",
      support: "Soutien",
      supportFeatures: "Demandes de fonctionnalités",
      supportTeams: "Soutien MS Teams",
      supportBugs: "Rapports de bogues",
      supportDesk: "Centre de services",
      supportContact: "Contacter le soutien",
      supportIssues: "Problèmes connus",
      developers: "Développeurs",
      developerDesign: "Système de conception v1.1",
      developerApis: "API et SDK",
      developerCicd: "Intégrations CI/CD",
      developerPipelines: "Pipelines de déploiement",
      developerDocs: "Documentation pour développeurs",
      developerLabs: "Accès à Data Labs",
      platform: "Plateforme",
      platformHome: "Accueil",
      platformRoadmap: "Feuille de route",
      platformNews: "Actualités et mises à jour",
      platformReleases: "Notes de version",
      platformAccessibility: "Accessibilité",
      platformPrivacy: "Confidentialité et conditions"
    },
    allRightsReserved: "Tous droits réservés.",
    version: "v0.37.2 · 14 juillet 2026 · 12 h 52 HAE",
    privacyPolicy: "Politique de confidentialité",
    termsOfService: "Conditions d’utilisation",
    accessibility: "Accessibilité",
    cookieSettings: "Paramètres des témoins"
  }
} as const satisfies TranslationShape<typeof en>;
